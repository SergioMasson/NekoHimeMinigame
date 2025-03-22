import { Scene } from "@babylonjs/core/scene";
import { Engine } from "@babylonjs/core/Engines/engine";
import { IState } from "./stateMachine";
import { Nullable } from "@babylonjs/core/types";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import HavokPhysics from "@babylonjs/havok";
import { HavokPlugin, PhysicsCharacterController, CharacterSupportedState, CharacterSurfaceInfo, PhysicsAggregate, PhysicsShapeType } from "@babylonjs/core/Physics";
import { Vector3, Quaternion } from "@babylonjs/core/Maths/math.vector";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { KeyboardEventTypes } from "@babylonjs/core/Events/keyboardEvents";
import { Camera, FreeCamera } from "@babylonjs/core";

enum PlayerState {
    IN_AIR,
    ON_GROUND,
    START_JUMP,
}

export class Level1State implements IState {
    private _scene: Nullable<Scene>;
    private readonly _engine: Engine;
    private _havokPlugin: Nullable<HavokPlugin>;
    private _player: Nullable<Mesh>;
    private _characterController: Nullable<PhysicsCharacterController>;
    private _playerPosition: Vector3;
    private _playerState: PlayerState;
    private _playerWantsToJump: boolean;
    private jumpHeight = 1.5;
    private inputDirection = new Vector3(0,0,0);
    private onGroundSpeed = 0;
    private inAirSpeed = 0;
    private readonly characterGravity = new Vector3(0, -35, 0);
    private readonly forwardLocalSpace = new Vector3(0, 0, 1);
    private _isReady = false;
    private readonly _ortographicScale = 20;
    private _isDone: boolean;

    constructor(engine: Engine) {
        this._engine = engine;
        this._havokPlugin = null;
        this._playerPosition = new Vector3();
        this._playerWantsToJump = false;
        this._isDone = false;
    }

    public OnStart(): void {
        this._isDone = false;
        this.OnStartAsync();
    }

    async OnStartAsync(): Promise<void> {
        console.log("Level1State started");
        this._scene = new Scene(this._engine);
        this._isReady = false;

        const havokInterface = await HavokPhysics();
        this._havokPlugin = new HavokPlugin(undefined /* or the value that fits your usecase */, havokInterface);

        this._scene.enablePhysics(new Vector3(0, -9.81, 0), this._havokPlugin);

        const h = 1.8;
        const r = 0.6;
        this._player = MeshBuilder.CreateCapsule("CharacterDisplay", { height: h, radius: r }, this._scene);
       
        this._playerPosition = new Vector3(0, 30, 0);
        this._player.position.copyFrom(this._playerPosition);

        this._characterController = new PhysicsCharacterController(this._playerPosition, { capsuleHeight: h, capsuleRadius: r }, this._scene);
        
        const floor = MeshBuilder.CreateBox("plane", {width: 100, height: 2, depth: 2});
        floor.freezeWorldMatrix();
        floor.doNotSyncBoundingInfo = true;
        new PhysicsAggregate(floor, PhysicsShapeType.BOX);

        this._scene.onBeforeRenderObservable.add((scene) => {
            if (!this._characterController || !this._player) {
                return;
            }
            
            this._player.position.copyFrom(this._characterController.getPosition());
        });

        // After physics update, compute and set new velocity, update the character controller state
        this._scene.onAfterPhysicsObservable.add((_) => {
            if (!this._characterController) return;
            if (this._scene?.deltaTime == undefined) return;
            
            let dt = this._scene.deltaTime / 1000.0;
            if (dt == 0) return;

            let down = new Vector3(0, -1, 0);
            let support = this._characterController.checkSupport(dt, down);

            if (support.supportedState === CharacterSupportedState.SUPPORTED) {
                this._isDone = true;
                return;
            }

            let desiredLinearVelocity = this._getDesiredVelocity(dt, support, Quaternion.Zero(), this._characterController.getVelocity());
            this._characterController.setVelocity(desiredLinearVelocity);
            this._characterController.integrate(dt, support, this.characterGravity);
        });

        // Input to direction
        // from keys down/up, update the Vector3 inputDirection to match the intended direction. Jump with space
        this._scene.onKeyboardObservable.add((kbInfo) => {
            switch (kbInfo.type) {
                case KeyboardEventTypes.KEYDOWN:
                    if (kbInfo.event.key == ' ') {
                        this._playerWantsToJump = true;
                    }
                    break;
                case KeyboardEventTypes.KEYUP:
                    if (kbInfo.event.key == ' ') {
                        this._playerWantsToJump = false;
                    }
                    break;
            }
        });

        this._scene.createDefaultLight(true);
        const ratio = this._engine.getScreenAspectRatio();

        var camera = new FreeCamera("mainCamera", new Vector3(0, 5, -10), this._scene);
        camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
        camera.orthoLeft = - ratio * this._ortographicScale;
        camera.orthoBottom = 0;
        camera.orthoRight = ratio * this._ortographicScale;
        camera.orthoTop = this._ortographicScale * 2;

        this._isReady = true;
    }

    // From aiming direction and state, compute a desired velocity
    // That velocity depends on current state (in air, on ground, jumping, ...) and surface properties
    private _getDesiredVelocity(deltaTime: number, supportInfo: CharacterSurfaceInfo, characterOrientation: Quaternion, currentVelocity: Vector3) : Vector3 {
        if (!this._characterController) {
            return Vector3.Zero();
        }
        
        let nextState = this._getNextState(supportInfo);
        if (nextState != this._playerState) {
            this._playerState = nextState;
        }

        let upWorld = this.characterGravity.normalizeToNew();
        upWorld.scaleInPlace(-1.0);
        let forwardWorld = this.forwardLocalSpace.applyRotationQuaternion(characterOrientation);
        if (this._playerState == PlayerState.IN_AIR) {
            let desiredVelocity = this.inputDirection.scale(this.inAirSpeed).applyRotationQuaternion(characterOrientation);
            let outputVelocity = this._characterController.calculateMovement(deltaTime, forwardWorld, upWorld, currentVelocity, Vector3.ZeroReadOnly, desiredVelocity, upWorld);
            // Restore to original vertical component
            outputVelocity.addInPlace(upWorld.scale(-outputVelocity.dot(upWorld)));
            outputVelocity.addInPlace(upWorld.scale(currentVelocity.dot(upWorld)));
            // Add gravity
            outputVelocity.addInPlace(this.characterGravity.scale(deltaTime));
            return outputVelocity;
        } else if (this._playerState == PlayerState.ON_GROUND) {
            // Move character relative to the surface we're standing on
            // Correct input velocity to apply instantly any changes in the velocity of the standing surface and this way
            // avoid artifacts caused by filtering of the output velocity when standing on moving objects.
            let desiredVelocity = this.inputDirection.scale(this.onGroundSpeed).applyRotationQuaternion(characterOrientation);

            let outputVelocity = this._characterController.calculateMovement(
                deltaTime,
                forwardWorld,
                supportInfo.averageSurfaceNormal,
                currentVelocity,
                supportInfo.averageSurfaceVelocity,
                desiredVelocity,
                upWorld
            );
            // Horizontal projection
            {
                outputVelocity.subtractInPlace(supportInfo.averageSurfaceVelocity);
                let inv1k = 1e-3;
                if (outputVelocity.dot(upWorld) > inv1k) {
                    let velLen = outputVelocity.length();
                    outputVelocity.normalizeFromLength(velLen);

                    // Get the desired length in the horizontal direction
                    let horizLen = velLen / supportInfo.averageSurfaceNormal.dot(upWorld);

                    // Re project the velocity onto the horizontal plane
                    let c = supportInfo.averageSurfaceNormal.cross(outputVelocity);
                    outputVelocity = c.cross(upWorld);
                    outputVelocity.scaleInPlace(horizLen);
                }
                outputVelocity.addInPlace(supportInfo.averageSurfaceVelocity);
                return outputVelocity;
            }
        } else if (this._playerState == PlayerState.START_JUMP) {
            let u = Math.sqrt(2 * this.characterGravity.length() * this.jumpHeight);
            let curRelVel = currentVelocity.dot(upWorld);
            return currentVelocity.add(upWorld.scale(u - curRelVel));
        }
        return Vector3.Zero();
    }

    private _getNextState(supportInfo: CharacterSurfaceInfo): PlayerState {
        if (this._playerWantsToJump) {
            return PlayerState.START_JUMP;
        }
        return PlayerState.IN_AIR;
    }

    OnFinish(): void {
        this._isReady = false;
        console.log("Level1State ended");

        if (this._characterController) {
            this._characterController = null;
        }

        if (this._scene) {
            this._scene.dispose();
            this._scene = null;
        }

        if (this._havokPlugin) {
            this._havokPlugin.dispose();
            this._havokPlugin = null;
        }
    }

    Update(): boolean {
        if ( this._isReady) {
            if (this._scene) {
                this._scene.render();
            }
        }

        return this._isDone;
    }
}

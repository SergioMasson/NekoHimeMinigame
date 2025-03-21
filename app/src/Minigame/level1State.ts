import { Scene } from "@babylonjs/core/scene";
import { Engine } from "@babylonjs/core/Engines/engine";
import { IState, StateMachine } from "./stateMachine";
import { Nullable } from "@babylonjs/core/types";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";

export class Level1State implements IState {
    private _scene: Nullable<Scene>;
    private readonly _engine: Engine;

    constructor(engine: Engine, stateMachine: StateMachine) {
        this._engine = engine;
    }

    async OnStartAsync(): Promise<void> {
        this._scene = new Scene(this._engine);
        // Our built-in 'sphere' shape.
        var sphere = MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, this._scene);

        // Move the sphere upward 1/2 its height
        sphere.position.y = 1;

        // Our built-in 'ground' shape.
        MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, this._scene);
        this._scene.createDefaultCameraOrLight(true, true, true);
    }

    async OnFinishAsync(): Promise<void> {
        console.log("Level1State ended");

        if (this._scene) {
            this._scene.dispose();
        }
    }

    Update(): void {
        if (this._scene) {
            this._scene.render();
        }
    }
}

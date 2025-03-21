import { Color4, Scene } from "@babylonjs/core";
import { IState, StateMachine } from "./stateMachine";
import { Engine } from "@babylonjs/core/Engines/engine";
import { AdvancedDynamicTexture } from "@babylonjs/gui/2D"
import { Nullable } from "@babylonjs/core/types";
import { Button } from "@babylonjs/gui/2D/controls/button";

export class Level0State implements IState {

    private _scene: Nullable<Scene>;
    private readonly _engine: Engine;
    private readonly _stateMachine: StateMachine;

    constructor(engine: Engine, stateMachine: StateMachine) {
        this._engine = engine;
        this._stateMachine = stateMachine;
    }

    async OnStartAsync(): Promise<void> {
        console.log("Level0State started");
        this._scene = new Scene(this._engine);
        this._scene.clearColor = new Color4(0, 0, 0, 1);
        this._scene.createDefaultCameraOrLight();
        const UITexture = AdvancedDynamicTexture.CreateFullscreenUI("GUI", true, this._scene);
        const loadedGUI = await UITexture.parseFromURLAsync("./assets/UI/startScreen.json");
        const playButton = loadedGUI.getControlByName("StartButton") as Button;

        playButton.onPointerClickObservable.add(() => {
            this._stateMachine.selectStateAsync(1);
        });
    }

    async OnFinishAsync(): Promise<void> {
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
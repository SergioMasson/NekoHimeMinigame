import { Color4, Scene } from "@babylonjs/core";
import { IState } from "./stateMachine";
import { Engine } from "@babylonjs/core/Engines/engine";
import { AdvancedDynamicTexture } from "@babylonjs/gui/2D"
import { Nullable } from "@babylonjs/core/types";
import { Button } from "@babylonjs/gui/2D/controls/button";

export class Level0State implements IState {

    private _scene: Nullable<Scene>;
    private readonly _engine: Engine;
    private _isDone: boolean;

    constructor(engine: Engine) {
        this._engine = engine;
        this._isDone = false;
    }

    public OnStart(): void {
        this._isDone = false;
        this.OnStartAsync();
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
            this._isDone = true;
        });
    }

    OnFinish(): void {
        if (this._scene) {
            this._scene.dispose();
            this._scene = null;
        }
    }
    
    Update(): boolean {
        if (this._scene) {
            this._scene.render();
        }

        return this._isDone;
    }

}
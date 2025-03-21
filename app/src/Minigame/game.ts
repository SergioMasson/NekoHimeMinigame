import { Scene } from "@babylonjs/core/scene";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Engine } from "@babylonjs/core/Engines/engine";

export class Game {
    private readonly _scene: Scene;

    constructor(engine: Engine, canvas: HTMLCanvasElement) {
        this._scene = new Scene(engine);
        // Our built-in 'sphere' shape.
        var sphere = MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, this._scene);

        // Move the sphere upward 1/2 its height
        sphere.position.y = 1;

        // Our built-in 'ground' shape.
        MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, this._scene);
        this._scene.createDefaultCameraOrLight(true, true, true);
    }

    public Update(deltaT: number): void {
        this._scene.render();
    }
}

import { Engine } from "@babylonjs/core/Engines/engine";
import { Game } from "./Minigame/game";

export class App {
    constructor(canvas: HTMLCanvasElement) {
        var engine = new Engine(canvas, true);
        var game = new Game(engine, canvas);

        window.addEventListener("resize", () => {
            engine.resize();
        });

        engine.runRenderLoop(() => {
            game.Update(engine.getDeltaTime() / 1000);
        });
    }
}

export function initialize(canvas: HTMLCanvasElement): void {
    new App(canvas);
}

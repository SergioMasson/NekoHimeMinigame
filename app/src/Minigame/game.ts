import { Engine } from "@babylonjs/core/Engines/engine";
import { StateMachine } from "./stateMachine";
import { Level0State } from "./level0State";
import { Level1State } from "./level1State";

export class Game {
    private readonly _stateMachine = new StateMachine();

    constructor(engine: Engine, canvas: HTMLCanvasElement) {
        this._stateMachine.pushState(new Level0State(engine, this._stateMachine), 0);
        this._stateMachine.pushState(new Level1State(engine, this._stateMachine), 1);
        this._stateMachine.selectStateAsync(0);
    }

    public Update(deltaT: number): void {
        this._stateMachine.update();
    }
}

import { Engine } from "@babylonjs/core/Engines/engine";
import { StateMachine } from "./stateMachine";
import { Level0State } from "./level0State";
import { Level1State } from "./level1State";
import { EndGameState } from "./endGameState";

enum GameStates {
    StartScreen = 1,
    Level1 = 2,
    EndGame = 3,
}

export class Game {
    private readonly _stateMachine = new StateMachine();

    constructor(engine: Engine, canvas: HTMLCanvasElement) {
        this._stateMachine.pushState(new Level0State(engine), GameStates.StartScreen);
        this._stateMachine.pushState(new Level1State(engine), GameStates.Level1);
        this._stateMachine.pushState(new EndGameState(engine), GameStates.EndGame);
        this._stateMachine.selectState(GameStates.StartScreen);
    }

    public Update(deltaT: number): void {
        const isDone = this._stateMachine.update();

        if (isDone) {
            const stateID = this._stateMachine.getCurrentStateID();

            switch (stateID as GameStates) {
                case GameStates.StartScreen:
                    this._stateMachine.selectState(GameStates.Level1);
                    break;

                case GameStates.Level1:
                    this._stateMachine.selectState(GameStates.EndGame);
                    break;

                case GameStates.EndGame:
                    this._stateMachine.selectState(GameStates.Level1);
                    break;
                default:
                    break;
            }
        }
    }

    public EndGame() {
        this._stateMachine.selectState(2);
    }

    public StartGame() {
        this._stateMachine.selectState(1);
    }
}

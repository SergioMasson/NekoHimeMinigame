import { Nullable } from "@babylonjs/core/types";

export interface IState {
    OnFinishAsync(): Promise<void>;
    OnStartAsync(): Promise<void>;
    Update(): void;
}

export class StateMachine {
    readonly _states: Map<number, IState> = new Map<number, IState>();
    private _currentState: Nullable<IState> = null;
    private _previewsState: Nullable<IState> = null;
    constructor() {}

    public pushState(state: IState, id: number) {
        this._states.set(id, state);
    }

    public async selectStateAsync(id: number): Promise<void> {
        if (this._currentState) {
            await this._currentState.OnFinishAsync();
            this._previewsState = this._currentState;
            this._currentState = null;
        }

        const nextState = this._states.get(id);

        if (nextState) {
            this._currentState = nextState;
            await this._currentState.OnStartAsync();
        }
    }

    public update() {
        if (this._currentState) {
            this._currentState.Update();
        }
    }

    public async returnToPreviewsStateAsync() : Promise<void> {
        if (this._currentState) {
            await this._currentState.OnFinishAsync();
            this._currentState = null;
        }

        if (this._previewsState) {
            this._currentState = this._previewsState;
            await this._currentState.OnStartAsync();
        }
    }
}

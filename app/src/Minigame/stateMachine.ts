import { Nullable } from "@babylonjs/core/types";

export interface IState {
    OnFinish(): void;
    OnStart(): void;
    Update(): boolean;
}

export class StateMachine {
    readonly _states: Map<number, IState> = new Map<number, IState>();
    private _currentState: Nullable<IState> = null;
    private _previewsState: Nullable<IState> = null;
    private _stateID: number;
    constructor() {}

    public pushState(state: IState, id: number) {
        this._states.set(id, state);
    }

    public selectState(id: number): void {
        if (this._currentState) {
            this._currentState.OnFinish();
            this._previewsState = this._currentState;
            this._currentState = null;
        }

        const nextState = this._states.get(id);
        this._stateID = id;

        if (nextState) {
            this._currentState = nextState;
            this._currentState.OnStart();
        }
    }

    public getCurrentStateID() : number{
        return this._stateID;
    }

    public update(): boolean {
        if (this._currentState) {
            return this._currentState.Update();
        }

        return false;
    }

    public returnToPreviewsStateAsync() : void {
        if (this._currentState) {
            this._currentState.OnFinish();
            this._currentState = null;
        }

        if (this._previewsState) {
            this._currentState = this._previewsState;
            this._currentState.OnStart();
        }
    }
}

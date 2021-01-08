import { createReducer, on } from '@ngrx/store';
import * as action from './ui.actions';

export interface State {
    isLoading: boolean; 
}

export const initialState: State = {
    isLoading : false,
}

const _uiReducer = createReducer(initialState,

    on(action.isLoading, state => ({ ...state, isLoading: true})),
    on(action.stopLoading, state => ({ ...state, isLoading: false})),

);

export function uiReducer(state, action) {
    return _uiReducer(state, action);
}
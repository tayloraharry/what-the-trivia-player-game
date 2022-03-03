import { createStore } from "redux";
import { roomReducer } from "./reducers/room";

import { combineReducers } from 'redux'

var reducers = combineReducers({roomReducer});

export const store = createStore(reducers);
export type RootState = ReturnType<typeof reducers>;
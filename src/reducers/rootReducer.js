//Combinación de todos los reducers

import { combineReducers } from "@reduxjs/toolkit";
import { calendarReducer } from "./calendarReducer";
import { uiReducer } from "./uiReducer";

/**
 * combineReducer recibe un objeto de como va a lucir mi store.
 */
export const rootReducer = combineReducers({
    ui          : uiReducer,
    calendar    : calendarReducer
});
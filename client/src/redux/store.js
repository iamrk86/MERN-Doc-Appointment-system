import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { alertSlice } from "./alertSlice";

const rootReducer = combineReducers({
  alerts: alertSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

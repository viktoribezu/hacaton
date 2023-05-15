import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { StateSchema } from "./StateSchema";
import { userReducer } from "./user/userSlice";

const rootReducer = combineReducers<StateSchema>({
    user: userReducer
});

export const store = configureStore({
    reducer: rootReducer,
});


export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];


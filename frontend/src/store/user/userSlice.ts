import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserSchema } from "./UserSchema";

const initialState: UserSchema = {
    _inited: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
        },
        logout: (state) => {
            state.authData = undefined;
            // TODO: remove user data
        }
    },
});


export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
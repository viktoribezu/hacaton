import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserSchema } from "./UserSchema";
import { loginByUsername, returnedLogin } from "@/services/api/User/loginByUsername";
import {resetPassword} from "@/services/api/User/resetPassword";

const initialState: UserSchema = {
    isLoading: false,
    _inited: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
        },
        initAuthData: (state) => {
            state._inited = true;
        },
        logout: (state) => {
            state.authData = undefined;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByUsername.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(loginByUsername.fulfilled, (state, action: PayloadAction<returnedLogin>) => {
                state.isLoading = false;
                state.authData = {
                    email: action.payload.email
                };
            })
            .addCase(loginByUsername.rejected, (state) => {
                state.isLoading = false;
                state.error = "Неверные данные для входа";
            })
            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.isLoading = false;
                state.resetPasswordStatus = 'success'
            })
            .addCase(resetPassword.rejected, (state) => {
                state.isLoading = false;
                state.resetPasswordStatus = 'error'
            })

    },
});


export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TokenSchema } from "@/store/token/TokenSchema";


const initialState: TokenSchema = {
    token: undefined
};

export const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        }
    },
});


export const { actions: tokenActions } = tokenSlice;
export const { reducer: tokenReducer } = tokenSlice;
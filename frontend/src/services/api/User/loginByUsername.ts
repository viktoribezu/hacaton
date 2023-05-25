import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/store/StateSchema";
import { tokenActions } from "@/store/token/tokenSlice";

interface loginByUsernameProps {
    email: string;
    password: string;
}

export interface returnedLogin {
    email: string;
}

export const loginByUsername = createAsyncThunk<
    returnedLogin,
    loginByUsernameProps,
    ThunkConfig<string>
    >(
        "user/loginByUsername",
        async ({ email, password }, thunkAPI) => {
            const { extra, rejectWithValue, dispatch } = thunkAPI;

            try {
                const response = await extra.api.post<{token: string}>("/accounts/login/", {
                    email,
                    password
                });

                if (!response.data) {
                    throw new Error();
                }

                dispatch(tokenActions.setToken(response.data.token));
                return {
                    email
                };
            } catch (e) {
                return rejectWithValue("error");
            }
        }
    );
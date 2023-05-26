import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/store/StateSchema";

interface loginByUsernameProps {
    email: string;
}

export interface returnedLogin {
    email: string;
}

export const resetPassword = createAsyncThunk<
    string,
    loginByUsernameProps,
    ThunkConfig<string>
    >(
    "user/resetPassword",
    async ({ email }, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post("/accounts/password/reset/", {
                email,
            });

            if (!response.data) {
                throw new Error();
            }

            return 'success'
        } catch (e) {
            return rejectWithValue("error");
        }
    }
);
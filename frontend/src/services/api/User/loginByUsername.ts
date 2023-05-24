import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/store/StateSchema";
import { User } from "@/store/user/UserSchema";

interface loginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
    User,
    loginByUsernameProps,
    ThunkConfig<string>
    >(
        "management/fetchManagementObjects",
        async ({ username, password }, thunkAPI) => {
            const { extra, rejectWithValue } = thunkAPI;

            try {
                const response = await extra.api.post<User>("/login/", {
                    username,
                    password
                });

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (e) {
                return rejectWithValue("error");
            }
        }
    );
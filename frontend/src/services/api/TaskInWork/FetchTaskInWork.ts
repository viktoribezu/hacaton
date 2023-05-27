import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/store/StateSchema";
import { djangoResponseType } from "@/types/djangoResponseType";
import { taskInWork } from "@/store/taskInWork/TaskInWorkSchema";

export const fetchTaskInWork = createAsyncThunk<
    taskInWork[],
    void,
    ThunkConfig<string>
    >(
        "taskInWork/fetchTaskInWork",
        async (_, thunkAPI) => {
            const { extra, rejectWithValue } = thunkAPI;

            try {
                const response = await extra.api.get<djangoResponseType<taskInWork>>("/task_in_work/", );

                if (!response.data) {
                    throw new Error();
                }

                return response.data.results;
            } catch (e) {
                return rejectWithValue("error");
            }
        }
    );
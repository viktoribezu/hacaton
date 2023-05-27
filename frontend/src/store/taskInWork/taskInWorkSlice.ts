import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { taskInWork, TaskInWorkSchema } from "@/store/taskInWork/TaskInWorkSchema";
import { fetchTaskInWork } from "@/services/api/TaskInWork/FetchTaskInWork";

const initialState: TaskInWorkSchema = {
    isLoading: false
};

export const managementSlice = createSlice({
    name: "taskInWork",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTaskInWork.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchTaskInWork.fulfilled, (state, action: PayloadAction<taskInWork[]>) => {
                state.isLoading = false;
                state.taskInWork = action.payload;
            })
            .addCase(fetchTaskInWork.rejected, (state) => {
                state.isLoading = false;
                state.error = "Ошибка при загрузке данных";
            });
    },
});


export const { actions: managementAction } = managementSlice;
export const { reducer: managementReducer } = managementSlice;
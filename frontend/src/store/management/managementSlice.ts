import { createSlice } from "@reduxjs/toolkit";
import { ManagementSchema } from "./ManagementSchema";

const initialState: ManagementSchema = {
    selectedRows: [],
    selectedRowsKeys: []
};

export const managementSlice = createSlice({
    name: "management",
    initialState,
    reducers: {
        setSelectedObject: (state, action) => {
            console.log(action.payload);
            state.selectedRows = action.payload.selectedRows;
            state.selectedRowsKeys = action.payload.selectedRowsKeys;
        }
    },
});


export const { actions: managementAction } = managementSlice;
export const { reducer: managementReducer } = managementSlice;
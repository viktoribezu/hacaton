import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ManagementFilterParams, ManagementSchema } from "./ManagementSchema";
import { fetchManagementObjects } from "@/services/api/Management/FetchManagementObjects";
import { mockedObject } from "@/utils/consts/mockedData";

const initialState: ManagementSchema = {
    isLoading: false,
    selectedRows: [],
    selectedRowsKeys: [],
    objectSource: [],
    filterGroup: {
        objectCategory: "",
        objectArea: "",
        sourceData: "",
        district: "",
        finishFixDate: "",
        startFixDate: ""
    },
    _inited: false,
};

export const managementSlice = createSlice({
    name: "management",
    initialState,
    reducers: {
        setSelectedObject: (state, action) => {
            state.selectedRows = action.payload.selectedRows;
            state.selectedRowsKeys = action.payload.selectedRowsKeys;
        },
        deleteObjects: (state) => {
            state.objectSource = state.objectSource.filter((object) => !state.selectedRowsKeys.includes(object.key));
            state.selectedRowsKeys = [];
            state.selectedRows = [];
        },
        updateFilterGroupField: (state, action: PayloadAction<ManagementFilterParams>) => {
            state.filterGroup = {
                ...state.filterGroup,
                ...action.payload
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchManagementObjects.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
                state._inited = true;
            })
            .addCase(fetchManagementObjects.fulfilled, (state) => {
                state.isLoading = false;
                // state.objectSource = action.payload;
                state.objectSource = mockedObject;
            })
            .addCase(fetchManagementObjects.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.isLoading = false;
                state.error = action.payload;

                // TODO: Убрать моковые данные
                state.objectSource = mockedObject;
            });
    },
});


export const { actions: managementAction } = managementSlice;
export const { reducer: managementReducer } = managementSlice;
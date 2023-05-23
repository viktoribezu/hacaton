import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ManagementFilterParams, ManagementSchema } from "./ManagementSchema";
import { fetchManagementObjects } from "@/services/api/Management/FetchManagementObjects";

const mockedObjectsSource = [
    {
        key: 1,
        name: "Mike",
        age: 32,
        address: "10 Downing Street",
        cadastralNumber: "2",
        objectType: "Жилой дом",
        exploitationYear: "2023",
        condition: "Хорошее",
    },
    {
        key: 2,
        name: "John",
        age: 42,
        address: "10 Downing Street",
        cadastralNumber: "2",
        objectType: "Жилой дом",
        exploitationYear: "2023",
        condition: "Хорошее",
    },
    {
        key: 3,
        name: "Mike",
        age: 32,
        address: "10 Downing Street",
        cadastralNumber: "2",
        objectType: "Жилой дом",
        exploitationYear: "2023",
        condition: "Хорошее",
    },
    {
        key: 4,
        name: "John",
        age: 42,
        address: "10 Downing Street",
        cadastralNumber: "2",
        objectType: "Жилой дом",
        exploitationYear: "2023",
        condition: "Хорошее",
    },
    {
        key: 5,
        name: "Mike",
        age: 32,
        address: "10 Downing Street",
        cadastralNumber: "2",
        objectType: "Жилой дом",
        exploitationYear: "2023",
        condition: "Хорошее",
    },
];

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
    }
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
            })
            .addCase(fetchManagementObjects.fulfilled, (state, action) => {
                state.isLoading = false;
                state.objectSource = action.payload;
            })
            .addCase(fetchManagementObjects.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.isLoading = false;
                state.error = action.payload;

                // TODO: Убрать моковые данные
                state.objectSource = mockedObjectsSource;
            });
    },
});


export const { actions: managementAction } = managementSlice;
export const { reducer: managementReducer } = managementSlice;
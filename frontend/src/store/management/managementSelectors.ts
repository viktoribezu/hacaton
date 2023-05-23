import { StateSchema } from "@/store/StateSchema";

export const getSelectedRows = (state: StateSchema) => state.management.selectedRows;
export const getSelectedRowsKeys = (state: StateSchema) => state.management.selectedRowsKeys;
export const getObjectSourceData = (state: StateSchema) => state.management.objectSource;
export const getObjectIsLoading = (state:StateSchema) => state.management.isLoading;

// Filter group selectors
export const getManagementFilterObjectCategory = (state: StateSchema) => state.management.filterGroup.objectCategory;
export const getManagementFilterGroupSourceData = (state: StateSchema) => state.management.filterGroup.sourceData;
export const getManagementFilterGroupObjectArea = (state: StateSchema) => state.management.filterGroup.objectArea;
export const getManagementFilterGroupStartFixDate = (state: StateSchema) => state.management.filterGroup.startFixDate;
export const getManagementFilterGroupFinishFixDate = (state: StateSchema) => state.management.filterGroup.finishFixDate;
export const getManagementFilterGroupDistrict = (state: StateSchema) => state.management.filterGroup.district;
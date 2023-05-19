import { StateSchema } from "@/store/StateSchema";

export const getSelectedRows = (state: StateSchema) => state.management.selectedRows;
export const getSelectedRowsKeys = (state: StateSchema) => state.management.selectedRowsKeys;
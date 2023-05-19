import type { ManagementSchema, ManagementObject } from "./ManagementSchema";

export { ManagementSchema, ManagementObject };

export {
    managementAction,
} from "./managementSlice";

export {
    getSelectedRowsKeys,
    getObjectSourceData
} from "./managementSelectors";
export interface ManagementObject {
    key: number;
    name: string;
    age: number;
    address: string;
    cadastralNumber: string;
    objectType: string;
    exploitationYear: string;
    condition: string;
}

export interface ManagementSchema {
    selectedRowsKeys: number[];
    selectedRows: ManagementObject[];
    objectSource: ManagementObject[];
}
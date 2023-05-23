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

export interface ManagementFilterParams {
    objectCategory?: string;
    sourceData?: string;
    objectArea?: string;
    startFixDate?: string;
    finishFixDate?: string;
    district?: string;
}

export interface ManagementSchema {
    isLoading: boolean;
    selectedRowsKeys: number[];
    selectedRows: ManagementObject[];
    objectSource: ManagementObject[];
    filterGroup: ManagementFilterParams;
    error?: string;
}
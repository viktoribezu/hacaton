export interface ManagementObject {
    key: number;
    name: string;
    age: number;
    address: string;
    cadastralNumber: string;
    objectType: string;
    exploitationYear: string;
    condition: string;
    district: string;
    objectCategory: string;
    adm_area: string;
    street: string;
    house: string;


}

export interface ManagementFilterParams {
    objectCategory?: string;
    sourceData?: string;
    objectArea?: string;
    startFixDate?: string;
    finishFixDate?: string;
    district?: string;
    street?: string;
    house?: string;
}

export interface ManagementSchema {
    isLoading: boolean;
    selectedRowsKeys: number[];
    selectedRows: ManagementObject[];
    objectSource: ManagementObject[];
    filterGroup: ManagementFilterParams;
    error?: string;
    _inited: boolean;
}
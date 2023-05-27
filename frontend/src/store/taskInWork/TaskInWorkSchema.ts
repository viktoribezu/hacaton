export interface typeOfWork {
    id: number,
    is_archive: boolean,
    local_id: number,
    code: number,
    name: string,
    name_object: string,
    type_of_work: string,
    group_of_work: string,
    abbreviated_name_of_work: string
}

export interface taskInWork {
    is_archive?: boolean;
    global_id?: number;
    period?: number;
    num_entrance?: number,
    elevator_number?: number,
    plan_date_start?: Date,
    plan_date_end?: Date,
    fact_date_start?: Date,
    fact_date_end?: Date,
    unom?: number,
    typeOfWork?: typeOfWork
}

export interface TaskInWorkSchema {
   taskInWork?: taskInWork[];
   isLoading: boolean;
   error?: string;
}
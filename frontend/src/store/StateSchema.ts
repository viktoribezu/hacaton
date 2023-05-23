import { UserSchema } from "./user/UserSchema";
import { ManagementSchema } from "./management";
import { rtkApi } from "@/services/api/config/rtkApi";
import { AxiosInstance } from "axios";

export interface StateSchema {
    user: UserSchema;
    management: ManagementSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
}

// Типизируем поле extra у ThunkAPI
export interface ThunkExtraArg {
    api: AxiosInstance;
}

// Типизируем саму AsyncThunk
export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
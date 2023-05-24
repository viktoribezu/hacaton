import { createAsyncThunk } from "@reduxjs/toolkit";
import { ManagementObject } from "@/store/management";
import { ThunkConfig } from "@/store/StateSchema";
import { ManagementFilterParams } from "@/store/management/ManagementSchema";

export const fetchManagementObjects = createAsyncThunk<
    ManagementObject[],
    ManagementFilterParams,
    ThunkConfig<string>
    >(
        "management/fetchManagementObjects",
        async (managementFilterParams, thunkAPI) => {
            const { extra, rejectWithValue } = thunkAPI;

            try {
                const response = await extra.api.get<ManagementObject[]>("/task_in_work/", {
                    params: {
                        object__adm_area: managementFilterParams.objectCategory,
                        object__district: managementFilterParams.district,
                        fact_date_start: managementFilterParams.startFixDate,
                        fact_date_end: managementFilterParams.finishFixDate
                    }
                });

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (e) {
                return rejectWithValue("error");
            }
        }
    );
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ManagementObject } from "@/store/management";
import { ThunkConfig } from "@/store/StateSchema";
import { ManagementFilterParams } from "@/store/management/ManagementSchema";
import { djangoResponseType } from "@/types/djangoResponseType";

export const fetchManagementObjects = createAsyncThunk<
    ManagementObject[],
    ManagementFilterParams,
    ThunkConfig<string>
    >(
        "management/fetchManagementObjects",
        async (managementFilterParams, thunkAPI) => {
            const { extra, rejectWithValue } = thunkAPI;

            try {
                const response = await extra.api.get<djangoResponseType<ManagementObject>>("/object/", {
                    params: {
                        object__adm_area__inn: managementFilterParams.objectArea?.join(","),
                        object__district__inn: managementFilterParams.district?.join(","),
                        object__fact_date_start__inn: managementFilterParams.startFixDate?.join(","),
                        object__fact_date_end__inn: managementFilterParams.finishFixDate?.join(","),
                        object__house__inn: managementFilterParams.house?.join(","),
                        object__street__inn: managementFilterParams.street?.join(",")
                    }
                });

                if (!response.data) {
                    throw new Error();
                }

                return response.data.results;
            } catch (e) {
                return rejectWithValue("error");
            }
        }
    );
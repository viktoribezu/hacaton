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
                        adm_area__inn: managementFilterParams.objectArea?.join(","),
                        district__inn: managementFilterParams.district?.join(","),
                        fact_date_start__inn: managementFilterParams.startFixDate?.join(","),
                        fact_date_end__inn: managementFilterParams.finishFixDate?.join(","),
                        house__inn: managementFilterParams.house?.join(","),
                        street__inn: managementFilterParams.street?.join(",")
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
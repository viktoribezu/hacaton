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
                        adm_area__icontains: managementFilterParams.objectArea,
                        district__icontains: managementFilterParams.district,
                        fact_date_start__icontains: managementFilterParams.startFixDate,
                        fact_date_end__icontains: managementFilterParams.finishFixDate,
                        house__icontains: managementFilterParams.house,
                        street: managementFilterParams.street
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
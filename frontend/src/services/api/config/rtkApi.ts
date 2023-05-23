import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const rtkApi = createApi({
    reducerPath: "rtkApi",
    baseQuery: fetchBaseQuery({
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("USER_LOCALSTORAGE_KEY") || "token";

            if (token) {
                headers.set("authorization", token);
            }

            return headers;
        },
        baseUrl: __API__
    }),
    endpoints: () => ({ }),
});
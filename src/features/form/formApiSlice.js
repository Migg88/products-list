import { createApi } from "@reduxjs/toolkit/query/react";
import { cleanJSON } from "../../utils/formatUtils";
import axios from "axios";

const customBaseQuery = async ({ url, method = 'get', data }) => {
    try {
        const response = await axios({ url, method, data });

        if (typeof response.data === "string") {
            const cleanedData = cleanJSON(response.data);
            console.log(cleanedData)
            return { data: JSON.parse(cleanedData) };
        }

        return { data: response.data };
    } catch (axiosError) {
        let err = axiosError;
        
        if (axiosError.response) {
            const cleanedData = cleanJSON(axiosError.response.data);
            try {
                return { error: { status: axiosError.response.status, data: JSON.parse(cleanedData) } };
            } catch (parsingError) {
                err = parsingError;
            }
        }

        return {
            error: {
                status: err.response?.status || 500,
                data: err.message || "Unknown error",
            },
        };
    }
};

export const formApiSlice = createApi({
    reducerPath: 'formApi',
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        fetchForm: builder.query({
            query: () => ({
                url: import.meta.env.VITE_FORM_API_URL,
                method: 'get',
            })
        })
    })
});

export const { useFetchFormQuery } = formApiSlice;

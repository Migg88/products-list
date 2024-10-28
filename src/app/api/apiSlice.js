import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const axiosBaseQuery =
    ({ baseUrl }) =>
        async ({ url, method, data, params }, { getState }) => {
            try {
                const { token } = getState().auth;
                const result = await axios({
                    url: baseUrl + url,
                    method,
                    data,
                    params,
                });
                return { data: result.data };
            } catch (error) {
                if (error.response) {
                    const { status } = error.response;
                    return { error: { status, data: error.response.data } };
                }
                return { error: { status: 500, data: error.message } };
            }
        };

const apiSlice = createApi({
    baseQuery: axiosBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
    }),
    endpoints: () => ({}),
});

export default apiSlice;

import { apiSlice } from "./apiSlice";
import { AUTH_URL } from "../constants";



const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login : builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/login`,
                method: 'POST',
                body: data
            }),
        }),
    }),
});

export const {
    useLoginMutation
} = authApiSlice
import {apiSlice} from './apiSlice';
import { PROFILE_URL } from '../constants';


const profileSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => ({
                url: `${PROFILE_URL}/me`,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Profile']
        }),
        createProfile: builder.mutation({
            query: (data) => ({
                url: PROFILE_URL,
                method: 'POST',
                body: data
            }),
        }),
        addExperiance: builder.mutation({
            query: (data) => ({
                url: `${PROFILE_URL}/experience`,
                method: 'PUT',
                body: data
            }),
        }),
        addEducation: builder.mutation({
            query: (data) => ({
                url: `${PROFILE_URL}/education`,
                method: 'PUT',
                body: data
            }),
        }),
    }),
});


export const {
    useGetProfileQuery,
    useCreateProfileMutation,
    useAddExperianceMutation,
    useAddEducationMutation,
} = profileSlice;
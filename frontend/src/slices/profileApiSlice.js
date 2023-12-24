import {apiSlice} from './apiSlice';
import { PROFILE_URL } from '../constants';

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;


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
        deleteExperience: builder.mutation({
            query: (id) => ({
                url: `${PROFILE_URL}/experience/${id}`,
                method: 'DELETE'
            }),
        }),
        deleteEducation: builder.mutation({
            query: (id) => ({
                url: `${PROFILE_URL}/education/${id}`,
                method: 'DELETE'
            }),
        }),
        deleteProfile: builder.mutation({
            query: () => ({
                url: PROFILE_URL,
                method: 'DELETE'
            }),
        }),
        getProfiles: builder.query({
            query: () => ({
                url: PROFILE_URL,
            }),
            providesTags: ['Profile'],
            keepUnusedDataFor: 5
        }),
        getProfileById: builder.query({
            query: (userId) => ({
                url: `${PROFILE_URL}/user/${userId}`
            }),
            keepUnusedDataFor: 5
        }),
        getGitHubRepos: builder.query({
            query: (username) => ({
                url: `${PROFILE_URL}/github/${username}`
            }),
            headers : {
                'user-agent': 'node.js',
                 Authorization: `token ${GITHUB_TOKEN}`,
            },
            keepUnusedDataFor: 5,
            providesTags: ['Profile']
        }),
    }),
});


export const {
    useGetProfileQuery,
    useCreateProfileMutation,
    useAddExperianceMutation,
    useAddEducationMutation,
    useDeleteExperienceMutation,
    useDeleteEducationMutation,
    useDeleteProfileMutation,
    useGetProfilesQuery,
    useGetProfileByIdQuery,
    useGetGitHubReposQuery,
} = profileSlice;
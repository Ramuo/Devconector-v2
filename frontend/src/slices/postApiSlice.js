import {apiSlice} from './apiSlice';
import { POSTS_URL } from '../constants';


const postApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        creatPost: builder.mutation({
            query: (data) => ({
                url: POSTS_URL,
                method: 'POST',
                body: data
            })
        }),
        getPosts: builder.query({
            query: () => ({
                url: POSTS_URL
            }),
            providesTags: [' Post'],
            keepUnusedDataFor: 5
        }),
        getPost: builder.query({
            query: (userId) => ({
                url: `${POSTS_URL}/${userId}`
            }),
            providesTags: [' Post'],
            keepUnusedDataFor: 5
        }),
        likePost: builder.mutation({
            query: (postId) => ({
                url: `${POSTS_URL}/like/${postId}`,
                method: 'PUT',
                body: postId
            }),
        }),
        unlikePost: builder.mutation({
            query: (postId) => ({
                url: `${POSTS_URL}/unlike/${postId}`,
                method: 'PUT',
                body: postId
            }),
        }),
        commentPost: builder.mutation({
            query: (postId) => ({
                url: `${POSTS_URL}/comment/${postId}`,
                method: 'POST',
                body: postId
            }),
        }),
        deletePost: builder.mutation({
            query: (postId) => ({
                url: `${POSTS_URL}/${postId}`,
                method: 'DELETE',
                body: postId
            }),
        }),
        deleteComment: builder.mutation({
            query: (data) => ({
                url: `${POSTS_URL}/${data.postId}/${data.commentId}`,
                method: 'DELETE',
                body: data
            }),
        }),
    }),
});

export const {
    useCreatPostMutation,
    useGetPostsQuery,
    useGetPostQuery,
    useLikePostMutation,
    useUnlikePostMutation,
    useCommentPostMutation,
    useDeletePostMutation,
    useDeleteCommentMutation,
} = postApiSlice
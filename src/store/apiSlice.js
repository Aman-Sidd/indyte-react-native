import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://indyte-backend.vercel.app/api/';

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: builder => ({
    generateLoginOTP: builder.mutation({
      query: data => ({
        url: 'auth/otplogin',
        method: 'POST',
        body: data,
      }),
    }),
    veriftyLoginOTP: builder.mutation({
      query: data => ({
        url: 'auth/verifylogin',
        method: 'POST',
        body: data,
      }),
    }),
    userLogin: builder.mutation({
      query: data => ({
        url: 'auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    generateUser: builder.mutation({
      query: data => ({
        url: 'auth/register',
        method: 'POST',
        body: data,
      }),
    }),
    verifyUser: builder.mutation({
      query: data => ({
        url: 'auth/registerverify',
        method: 'POST',
        body: data,
      }),
    }),
    getProfile: builder.query({
      query: token => ({
        url: 'profile',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }),
    }),
    getMeals: builder.query({
      query: userid => ({
        url: `getusermeals?userid=${userid}`,
        method: 'GET',
      }),
    }),
    waterIntake: builder.mutation({
      query: data => ({
        url: 'auth/water-intake',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});


export const {
  useGetProfileQuery,
  useGenerateLoginOTPMutation,
  useVeriftyLoginOTPMutation,
  useGenerateUserMutation,
  useVerifyUserMutation,
  useGetMealsQuery,
  useWaterIntakeMutation,
  useUserLoginMutation,
} = apiSlice;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IDeveloper, IRandomDevelopersParams } from 'interfaces/developers.interface';
import { IPaginationParams, IPaginationResponse } from 'interfaces/common.interface';
import { REACT_APP_API_URL } from 'config';

export const developersApi = createApi({
  reducerPath: 'developersApi',
  baseQuery: fetchBaseQuery({ baseUrl: REACT_APP_API_URL }),
  tagTypes: ['Developers'],
  endpoints: (builder) => ({
    getDevelopers: builder.query<IPaginationResponse<IDeveloper>, IPaginationParams>({
      query({page, perPage}) {
        return `developers?page=${page}&perPage=${perPage}`;
      },
      providesTags: (result) => ([
        ...(result?.rows ?? []).map(({ id }) => (
          { type: 'Developers' as const, id }
        )),
        { type: 'Developers', id: 'LIST' },
      ])
    }),
    getRandomDevelopers: builder.query<{ developers: IDeveloper[], speakerId?: number }, IRandomDevelopersParams>({
      query({teamId, order, speaker}) {
        return `developers/random?teamId=${teamId}&order=${order}&speaker=${speaker}`;
      },
    }),
    createDeveloper: builder.mutation<IDeveloper, IDeveloper>({
      query(data) {
        return {
          url: 'developers',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: [{ type: 'Developers', id: 'LIST' }],
    }),
    updateDeveloper: builder.mutation<
      IDeveloper,
      { id: number; formData: IDeveloper }
    >({
      query({ id, formData }) {
        return {
          url: `developers/${id}`,
          method: 'PATCH',
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: 'Developers', id },
              { type: 'Developers', id: 'LIST' },
            ]
          : [{ type: 'Developers', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetDevelopersQuery,
  useLazyGetRandomDevelopersQuery,
  useCreateDeveloperMutation,
  useUpdateDeveloperMutation,
} = developersApi;


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { REACT_APP_API_URL } from 'config';
import { ITeam } from 'interfaces/teams.interface';

export const teamsApi = createApi({
  reducerPath: 'teamsApi',
  baseQuery: fetchBaseQuery({ baseUrl: REACT_APP_API_URL }),
  tagTypes: ['Teams'],
  endpoints: (builder) => ({
    getTeams: builder.query<ITeam[], void>({
      query() {
        return 'teams';
      },
      providesTags: (result) => ([
        ...(result ?? []).map(({ id }) => (
          { type: 'Teams' as const, id }
        )),
        { type: 'Teams', id: 'LIST' },
      ])
    }),
  }),
});

export const {
  useGetTeamsQuery,
} = teamsApi;


import { api } from '../../../../../shared/api/api';

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<any, void>({
      query: () => ({
        url: '/employees',
        method: 'GET',
      }),
    }),
    getUser: build.query<any, number>({
      query: (id: number) => ({
        url: '/employees/' + id,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetUsersQuery, useGetUserQuery } = usersApi;

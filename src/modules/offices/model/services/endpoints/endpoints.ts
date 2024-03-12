import { api } from '../../../../../shared/api/api';

export const officesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getOffices: build.query<any, void>({
      query: () => ({
        url: '/apartments',
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetOfficesQuery } = officesApi;

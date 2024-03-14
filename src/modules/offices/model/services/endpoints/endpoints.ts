import { api } from '../../../../../shared/api/api';

export const officesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getOffices: build.query<any, void>({
      query: () => ({
        url: '/apartments',
        method: 'GET',
      }),
    }),
    getOffice: build.query<any, void>({
      query: (id) => ({
        url: '/apartments/' + id,
        method: 'GET',
      }),
    }),
    getSale: build.query<any, number>({
      query: (id: number) => ({
        url: '/sales/' + id,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetOfficesQuery, useGetSaleQuery, useGetOfficeQuery } = officesApi;

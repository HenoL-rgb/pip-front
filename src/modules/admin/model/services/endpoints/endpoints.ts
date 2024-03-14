import { api } from '../../../../../shared/api/api';

export const adminApi = api.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (body: { email: string; password: string }) => ({
        url: '/employees',
        method: 'POST',
        body,
      }),
    }),
    updateUser: build.mutation({
      query: ({ id, dto }) => ({
        url: '/employees/' + id,
        method: 'PATCH',
        body: dto,
      }),
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: '/employees/' + id,
        method: 'DELETE',
      }),
    }),
    createPosition: build.mutation({
      query: (body: { name: string }) => ({
        url: '/positions/',
        method: 'POST',
        body,
      }),
    }),
    updatePosition: build.mutation({
      query: ({ id, dto }) => ({
        url: '/positions/' + id,
        method: 'PATCH',
        body: dto,
      }),
    }),
    deletePosition: build.mutation({
      query: (id) => ({
        url: '/positions/' + id,
        method: 'DELETE',
      }),
    }),
    createCity: build.mutation({
      query: (body: { name: string }) => ({
        url: '/cities/',
        method: 'POST',
        body,
      }),
    }),
    updateCity: build.mutation({
      query: ({ id, dto }) => ({
        url: '/cities/' + id,
        method: 'PATCH',
        body: dto,
      }),
    }),
    deleteCity: build.mutation({
      query: (id) => ({
        url: '/cities/' + id,
        method: 'DELETE',
      }),
    }),
    createProduct: build.mutation({
      query: (body: { name: string; amount: number; apartmentId: number }) => ({
        url: '/products/',
        method: 'POST',
        body,
      }),
    }),
    updateProduct: build.mutation({
      query: ({ id, dto }) => ({
        url: '/products/' + id,
        method: 'PATCH',
        body: dto,
      }),
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: '/products/' + id,
        method: 'DELETE',
      }),
    }),
    getPositions: build.query({
      query: () => ({
        url: '/positions',
        method: 'GET',
      }),
    }),
    getCities: build.query({
      query: () => ({
        url: '/cities',
        method: 'GET',
      }),
    }),
    getSales: build.query({
      query: () => ({
        url: '/sales',
        method: 'GET',
      }),
    }),
    getApartments: build.query({
      query: () => ({
        url: '/apartments/admin',
        method: 'GET',
      }),
    }),
    getProducts: build.query({
      query: () => ({
        url: '/products',
        method: 'GET',
      }),
    }),
    createApartment: build.mutation({
      query: (body: { street: string; cityId: number }) => ({
        url: '/apartments/',
        method: 'POST',
        body,
      }),
    }),
    updateApartment: build.mutation({
      query: ({ id, dto }) => ({
        url: '/apartments/' + id,
        method: 'PATCH',
        body: dto,
      }),
    }),
    deleteApartment: build.mutation({
      query: (id) => ({
        url: '/apartments/' + id,
        method: 'DELETE',
      }),
    }),
    createSale: build.mutation({
      query: (body: { amount: number, apartmentId: number, date: Date, productId: number }) => ({
        url: '/sales/',
        method: 'POST',
        body,
      }),
    }),

    deleteSale: build.mutation({
      query: (id) => ({
        url: '/sales/' + id,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCreateCityMutation,
  useCreatePositionMutation,
  useCreateProductMutation,
  useDeleteCityMutation,
  useDeletePositionMutation,
  useDeleteProductMutation,
  useUpdateCityMutation,
  useUpdatePositionMutation,
  useUpdateProductMutation,
  useGetPositionsQuery,
  useGetApartmentsQuery,
  useGetCitiesQuery,
  useGetSalesQuery,
  useGetProductsQuery,
  useCreateApartmentMutation,
  useDeleteApartmentMutation,
  useUpdateApartmentMutation,
  useCreateSaleMutation,
  useDeleteSaleMutation
} = adminApi;

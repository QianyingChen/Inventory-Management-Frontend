import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const warehouseApi = createApi({
  reducerPath: 'warehouseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9000/' }),
  endpoints: (builder) => ({
    findAllWarehouse: builder.query({
      query: () => '/warehouses',
    }),
    findWarehouseById: builder.query({
      query: (id) => `/warehouses/${id}`,
    }),
    createWarehouse: builder.mutation({
      query: (warehouse) => ({
        url: '/warehouses',
        method: 'POST',
        body: warehouse,
      }),
    }),
    updateWarehouse: builder.mutation({
      query: ({ id, ...changes }) => ({
        url: `/warehouses/${id}`,
        method: 'PUT',
        body: changes,
      }),
    }),
    deleteWarehouse: builder.mutation({
      query: (id) => ({
        url: `/warehouses/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useFindAllWarehouseQuery,
  useFindWarehouseByIdQuery,
  useCreateWarehouseMutation,
  useUpdateWarehouseMutation,
  useDeleteWarehouseMutation,
} = warehouseApi;



import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { setProductsData } from '../slices/productsSlice';
import { ProductType } from '../types/product';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_ENDPONT
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<ProductType[], void>({
            query: () => 'products',
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    await dispatch(setProductsData(data));
                    await queryFulfilled;
                } catch (error) {
                    console.log('Ошибка при получении списка продуктов!');
                }
            }
        })
    })
});

export const { useGetProductsQuery } = productsApi;

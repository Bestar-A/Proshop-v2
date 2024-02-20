import { PRODUCTS_URL, UPLOAD_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ( {
                url: PRODUCTS_URL
            }),
            providesTags: ['Product'],
            keepUnusedDataFor: 5,
        }),
        getProductById: builder.query({
            query: (productId) => ( {
                url: `${PRODUCTS_URL}/${productId}`
            }),
            providesTags: ['Product'],
            keepUnusedDataFor: 5,
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCTS_URL,
                method: 'POST'
            }),
            invalidatesTags: ['Product']
        }),
        updateProduct: builder.mutation({
            query: ({productId, data}) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Product']
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: UPLOAD_URL,
                method: 'POST',
                body: data
            })
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE'
            })
        })
    })
})

export const { useGetProductsQuery, useGetProductByIdQuery, 
    useCreateProductMutation, useUpdateProductMutation, 
    useUploadProductImageMutation, useDeleteProductMutation } = productsApiSlice;
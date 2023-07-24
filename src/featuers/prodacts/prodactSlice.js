import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"


const prodactsAdapter = createEntityAdapter({})

const initialState = prodactsAdapter.getInitialState()


export const prodactSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
         getProdact: builder.query({
                query: () => ({
                    url: '/prodact',
                    validateStatus: (response, result) => {
                        return response.status === 200 && !result.isError
                    },
                }),
                transformResponse: responseData => {
                    const loadedprodacts = responseData.map(prodact => {
                        prodact.id = prodact._id
                        return prodact
                    });
                    return prodactsAdapter.setAll(initialState, loadedprodacts)
                },
                providesTags: (result, error, arg) => {
                    if (result?.ids) {
                        return [
                            { type: 'Prodact', id: 'LIST' },
                            ...result.ids.map(id => ({ type: 'prodact', id }))
                        ]
                    } else return [{ type: 'Prodact', id: 'LIST' }]
                }
            }),


            creatProdact: builder.mutation({
                query: (formData) => ({
                  url: 'prodact',
                  method: 'POST',
                  body: formData,
                }),
                invalidatesTags: [{ type: 'Prodact', id: 'LIST' }]
              }),


            updateProdact: builder.mutation({
                query: (prodact) =>
                ({
                    url: `/prodact/${prodact.id}`,
                    method: 'PUT',
                    body: prodact,
                }),
                invalidatesTags: (result, error, arg) => [
                    { type: 'Prodact', id: arg.id }
                ]
            }),



            deleteProdact: builder.mutation({
                query: ({id}) =>
                ({
                    url: `/prodact/${id}`,
                    method: 'DELETE',
                    body: id,
                }),
                invalidatesTags: (result, error, arg) => [
                    { type: 'Prodact', id: arg.id }
                ]
            }),



            getProdactTepy: builder.mutation({
                query: (prodact) =>
                ({
                    url: 'prodact/v1',
                    method: 'GET',
                    body: prodact,
                }),
                invalidatesTags: (result, error, arg) => [
                    { type: 'Prodact', id: arg.id }
                ]
            }),
           }),

        

    
})

export const { 
    useGetProdactQuery,
    useCreatProdactMutation,
    useGetProdactTepyMutation,
    useDeleteProdactMutation,
    useUpdateProdactMutation
 } = prodactSlice



 // returns the query result object
export const selectProdactsResult = prodactSlice.endpoints.getProdact.select()

// creates memoized selector
const selectProdactsData = createSelector(
    selectProdactsResult,
    prodactsResult => prodactsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllProdacts,
    selectById: selectProdactById,
    selectIds: selectProdactIds
    // Pass in a selector that returns the prodacts slice of state
} = prodactsAdapter.getSelectors(state => selectProdactsData(state) ?? initialState)
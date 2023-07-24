import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

const cartsAdapter = createEntityAdapter({})

const initialState = cartsAdapter.getInitialState()


export const cartSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
         getCart: builder.query({
                query: (Buyer) => ({
                    url: `/cart/${Buyer}`,
                    validateStatus: (response, result) => {
                        return response.status === 200 && !result.isError
                    },
                }),
                transformResponse: responseData => {
                    const loadedcarts = responseData.map(cart => {
                        cart.id = cart._id
                        return cart
                    });
                    return cartsAdapter.setAll(initialState, loadedcarts)
                },
                providesTags: (result, error, arg) => {
                    if (result?.ids) {
                        return [
                            { type: 'Cart', id: 'LIST' },
                            ...result.ids.map(id => ({ type: 'cart', id }))
                        ]
                    } else return [{ type: 'Cart', id: 'LIST' }]
                }
            }),
         getCartUser: builder.query({
                query: (user) => ({
                    url: `/cart/v2/${user}`,
                    body: user,
                   
                }),
            }),
            creatCart: builder.mutation({
                query: (formData) =>
                ({
                    url: '/cart',
                    method: 'POST',
                    body: formData,
                }),
                invalidatesTags: [{ type: 'Cart', id: 'LIST' }]
            }),




            deleteCart: builder.mutation({
                query: ({Buyer}) =>
                ({
                    url: `/cart/${Buyer}`,
                    method: 'DELETE',
                    body: Buyer,
                }),
                invalidatesTags: (result, error, arg) => [
                    { type: 'Cart', id: arg.id }
                ]
            }),
        })        
})

export const { 
    useGetCartQuery,
    useGetCartUserQuery,
    useCreatCartMutation,
    useDeleteCartMutation,
 } = cartSlice



 // returns the query result object
export const selectCartsResult = cartSlice.endpoints.getCart.select()

// creates memoized selector
const selectCartsData = createSelector(
    selectCartsResult,
    cartsResult => cartsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllCarts,
    selectById: selectCartById,
    selectIds: selectCartIds
    // Pass in a selector that returns the carts slice of state
} = cartsAdapter.getSelectors(state => selectCartsData(state) ?? initialState)
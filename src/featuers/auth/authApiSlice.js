import { apiSlice } from "../../app/api/apiSlice";
import { logOut, logIn } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials}
            })
        }),
        
        sendLogOut: builder.mutation({
            query: credentials => ({
                url: '/auth/logout',
                method: 'POST',
                body: {...credentials}
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data)
                    dispatch(logOut())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data)
                    const { accessToken } = data
                    dispatch(logIn({ accessToken }))
                } catch (err) {
                    console.log(err)
                }
            },
        }),
        
    })
})

export const {
    useLoginMutation,
    useRefreshMutation,
    useSendLogOutMutation
} = authApiSlice
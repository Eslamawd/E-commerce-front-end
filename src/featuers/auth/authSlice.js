import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null },
    reducers: {
       logIn : (state, action) => {
            const { accessToken } = action.payload  
            state.token = accessToken 
        },
        logOut: (state, action) => {
   
            state.token = null
        },
    }
})


export const { logIn, logOut } = authSlice.actions


export default authSlice.reducer

export const slectCarntToken = (state) => state.auth.token;
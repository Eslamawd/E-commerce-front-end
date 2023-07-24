import { store } from '../../../app/store'
import { prodactSlice } from '../../../featuers/prodacts/prodactSlice'
import { userSlice } from '../../../featuers/user/userSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing')
        const prodact = store.dispatch(prodactSlice.endpoints.getProdact.initiate())
        const users = store.dispatch(userSlice.endpoints.getUsers.initiate())

        return () => {
            console.log('unsubscribing')
            prodact.unsubscribe()
            users.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch
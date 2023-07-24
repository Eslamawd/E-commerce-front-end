import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { slectCarntToken } from './featuers/auth/authSlice'


import './LayOut.css'
import NavBar from './routes/navbar/NavBar'


const LayOut = () => {

  const token = useSelector(slectCarntToken)
  const location = useLocation()
  console.log(token)


  return (
    <div className="contenar">
        <NavBar/>
    
        <Outlet/>
    </div>
  )
}

export default LayOut
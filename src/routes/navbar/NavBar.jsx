import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { slectCarntToken } from '../../featuers/auth/authSlice'
import { useSendLogOutMutation } from '../../featuers/auth/authApiSlice'
import  SideBar from '../sidebar/SideBar'
import useAuth from '../../hooks/useAuth'



const NavBar = () => {

  const [ veiw, setVeiw ] = useState(false) 
  const token = useSelector(slectCarntToken)

  const { id } = useAuth()


  const Buyer = id
  
  const navigate = useNavigate()


  const getMyCart = () => navigate(`/cart/${Buyer}`)
  const [sendLogout, {
      isLoading,
      isSuccess,
      isError,
      error
  }] = useSendLogOutMutation()


   const onClickLogOut = () => sendLogout()
  useEffect(() => {
    if (isSuccess) navigate('/')
}, [isSuccess, navigate])

if (isLoading) return <p>Logg Out...</p>

if (isError) return <p>Error: {error.data?.message}</p>
  return (
  
      <nav>
    <Link className='logo' to='/' >COLOO</Link>
    <ul> {token? <li>
      <button className='button log-out' onClick={onClickLogOut} >
      LogOut
      </button>
      </li> : 
            <li>
            <Link to='auth'>
                  SIGN
                  </Link>
                  </li> }
     
      <li>
      <Link to='/'>
              HOME
              </Link>
      </li>
      {token ? 
      <li>
      <Link to='profile'>
              PROFILE
              </Link>
      </li>
       
      : 
      ""
      }
      {token ? 
      <li>
      <button className='button log-out' onClick={getMyCart} >
      Cart
      </button>
      </li>
       
      : 
      ""
      }
      <li className='no' onClick={() => { setVeiw((prev)=>!prev)}}>=</li>
      {veiw? (<SideBar/>) : (null)}
    </ul>
      
    </nav>
    

  )
}

export default NavBar;


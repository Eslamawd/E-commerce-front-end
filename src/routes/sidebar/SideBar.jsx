import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { slectCarntToken } from '../../featuers/auth/authSlice'


import './sidebar.css'

const SideBar = () => {

  const token = useSelector(slectCarntToken)

 

  return (
   <div className="side">
    <li>

        {token ?
      <ul>
          <li><Link to='createpro'>Create proudact</Link></li>
        <li>My sales</li>
        <li>My Prodact</li>
        <li>Advertisement</li>
      </ul>
        :
        ""
        }
        </li>
        
        </div>
  )
}

export default SideBar
import React from 'react'
//import { useSelector } from 'react-redux'
import"./Profile.css"
import { useGetUserQuery } from '../../../featuers/user/userSlice'
import useAuth from '../../../hooks/useAuth'

const Profile = () => {

const { id } = useAuth()

console.log(id)

const {
  data,
   error,
   isLoading
  
} = useGetUserQuery(id)




if (error) {
  return(
    <div className='home'>
      <h5> can not{error.message}</h5>

    </div>
  )
}

if (isLoading) {
   return (
    <div className='home'>
      <h3>Pleace wait... </h3>
    </div>
  )
}

 

  return (

    <div className="profile">
    <img src="" alt="" />
    <div className="ditels">
        <h1>{data.firstname + data.lastname}</h1>
        <h2>{data.numberphone}</h2>
    </div>
    <div className="prodact">
        <img src="" alt="" />
        <div>
            <h1>car</h1>
            <span>hsghsshjsjhssscksjhhbcbhh</span>
        </div>
    </div>
</div>
  )


}

export default Profile
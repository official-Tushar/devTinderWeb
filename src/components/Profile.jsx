import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    user && (
    <div className='flex justify-center mt-10 mb-20'>
      <EditProfile user={user}/>
    </div> )
  )
}

export default Profile
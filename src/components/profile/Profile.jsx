import React from 'react'
import EditProfile from './EditProfile';
import { useSelector } from 'react-redux';

const Profile = () => {
  const userData = useSelector(store => store.auth);
  return (
    <div>
      {userData && <EditProfile user={userData}/>}
    </div>
  )
}

export default Profile
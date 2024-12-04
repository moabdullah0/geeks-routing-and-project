import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import UsersList from './UsersList';

const UserDetailes = () => {
    const {id}=useParams();
  return (
    <div className='flex justify-around'>
     <UsersList/> user {id}
    </div>
  )
}

export default UserDetailes

import React, { Fragment, useEffect } from 'react'
import Metadata from '../../Metadata'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './Profile.css'

function Profile({navigator}) {
    const {user,loading,isAuthenticated}=useSelector((state=>state.user))

    useEffect(()=>{
        if(isAuthenticated===false){
            navigator("/Login ")
        }

    },[navigator,isAuthenticated])
  return (
    <Fragment>
        <Metadata title={`${user.name}'s Profile`}/>
        <div className='profilecontainer'>
        <div>
            <h1>My Profile</h1>
            <img src={user.avatar} alt={user.name}/>
            <Link to="/me/update">Edit Profile</Link>
        </div>  
        <div><div>
            <h4>Full name</h4>
            <p>{user.name}</p>
        </div>
        <div>
            <h4>Email</h4>
            <p>{user.email}</p>
        </div>
        <div>
            <h4>Joined On</h4>
            <p>{String(user.createdAt)}</p>
        </div>
        
        <div  className='password'>
            <div className='order'> <Link to='/order'>MY order</Link></div>
        
         <Link to="/password/update">Change Password</Link>
         </div></div>
        
         </div>
      
       
       
    </Fragment>
  )
}

export default Profile
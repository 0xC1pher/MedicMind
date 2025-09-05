import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'

export default function PrivateRoutes() {
  const {currentUser} = useSelector((state) => state.user);
  console.log("Current User:", currentUser); // Debugging line
  return currentUser ? <Outlet/> : <Navigate to='/signin'/>
    
  
}

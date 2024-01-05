import React, { useEffect } from 'react'
import Layout from '../components/reusablecomponents/Layout'
import { useState } from 'react'
import { useAuth } from '../context/auth';
import axios from 'axios';

import { Outlet } from 'react-router-dom';
import Spinner from './Spinner';
import AdminDashboard from '../pages/Admin/AdminDashboard';

const AdminRoute = () => {

    const[ok,setOk]=useState(false);
    const [auth,setAuth]=useAuth();

    useEffect(()=>{

    const authCheck=async()=>{
    const authcheck=await axios.get('/api/v1/user/admin-dashboard')

    if(authcheck){
        setOk(true)
    }
    else{
        setOk(false)
    }


    }
    if(auth?.token) {
        authCheck();
    }

    },[auth])

  return (

    
        ok ? <AdminDashboard/>:<Spinner/>
   
  )
}

export default AdminRoute

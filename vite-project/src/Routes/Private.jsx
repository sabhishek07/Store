import React, { useEffect } from 'react'
import Layout from '../components/reusablecomponents/Layout'
import { useState } from 'react'
import { useAuth } from '../context/auth';
import axios from 'axios';

import { Outlet } from 'react-router-dom';
import Spinner from './Spinner';

const Private = () => {

    const[ok,setOk]=useState(false);
    const [auth,setAuth]=useAuth();

    useEffect(()=>{

    const authCheck=async()=>{
    const authcheck=await axios.get('/api/v1/user/user-dashboard')

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

    
        ok ? <Layout>hii</Layout>:<Spinner/>
   
  )
}

export default Private

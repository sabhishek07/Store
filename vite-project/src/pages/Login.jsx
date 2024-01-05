import React, { useState } from 'react'
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';
  import axios from 'axios';
import Layout from '../components/reusablecomponents/Layout'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

const Login = () => {

    const[email,Setemail]=useState("")
    const[password,setpassword]=useState("")

    const[auth,setAuth]=useAuth();
    const navigate=useNavigate();

    const loginhandle=async(e)=>{
        e.preventDefault();

        try {

            const res=await axios.post('/api/v1/user/login',{email,password})

            if(res?.data?.success){

                setAuth({
                    user:res.data.checkloginuser,
                    token:res.data.token
                })
                localStorage.setItem('auth',JSON.stringify(res.data));
              toast.success(res.data.message)

                navigate('/')
            }
            else{
                toast.error(res.data.message)
            }
            
        } catch (error) {

            toast.error("Something went wrong")
            
        }
       

    

    }
  return (
    <Layout>
          <form onSubmit={loginhandle}>
         <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)'}}>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Enter In Store</h2>
          <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='form2'value={email} required='true' type='email'onChange={(e)=>{Setemail(e.target.value)}}/>
          <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3'value={password} required='true' type='password'onChange={(e)=>{setpassword(e.target.value)}}/>
         
         <button type='submit'>Login</button>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
    </form>
      

      
    </Layout>
  )
}

export default Login

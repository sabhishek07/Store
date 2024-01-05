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
import Layout from '../components/reusablecomponents/Layout';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [name,setname]=useState("")
    const[email,setemail]=useState("")
    const[password,setpassword]=useState("")
 

    const navigate=useNavigate();

    const registerhandle=async(e)=>{
        e.preventDefault();
        try {
            const res=await axios.post('/api/v1/user/register',{name,email,password});
            if(res && res.data.success){
                 toast.success(res.data && res.data.message)
                navigate('/login')
              

    
            }
            else{
                 toast.error(res.data.message)
            }
            
        } catch (error) {

            toast.error("Something went wrong ")
            
        }

      
      
      

    }
  return (
    <Layout>
        <form onSubmit={registerhandle}>
         <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)'}}>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>
          <MDBInput wrapperClass='mb-4' label='Your Name' size='lg' id='form1'type='text' value={name} onChange={(e)=>{setname(e.target.value)}}/>
          <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='form2'value={email} type='email'onChange={(e)=>{setemail(e.target.value)}}/>
          <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3'value={password} type='password'onChange={(e)=>{setpassword(e.target.value)}}/>
         
         <button type='submit'>Register</button>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
    </form>
      
    </Layout>
  )
}

export default Register

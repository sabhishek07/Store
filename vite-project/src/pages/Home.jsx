import React from 'react'
import Layout from '../components/reusablecomponents/Layout'
import {useAuth}from '../context/auth'

const Home = () => {

    const[auth,setAuth]=useAuth();
  return (
    <Layout>
        <h4>main</h4>
        <pre>{JSON.stringify(auth, null, 4)}</pre>

    </Layout>
      
    
  )
}

export default Home

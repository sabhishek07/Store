import React, { useEffect, useState } from 'react'
import Layout from '../components/reusablecomponents/Layout'
import { useLocation, useNavigate } from 'react-router-dom';

const Spinner = () => {

    const [count, setCount] = useState(3);
    const navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
          setCount((prevValue) => --prevValue);
        }, 1000);
        count === 0 &&
          navigate("/login", {
            state: location.pathname,
          });
        return () => clearInterval(interval);
      }, [count, navigate, location]);
  return (
    <Layout>
        <div className='d-flex flex-column justify-content-center align-items-center' style={{height:'80vh'}}>
        <h2 className="Text-center"> We are Checking details please await for {count} second </h2>
            <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
            </div>
      
    </Layout>
  )
}

export default Spinner

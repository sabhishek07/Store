
import React, { useEffect, useState } from 'react'
import Layout from '../../components/reusablecomponents/Layout'
import axios from 'axios'
import AdminMenu from '../../components/reusablecomponents/AdminMenu';
import { Link } from 'react-router-dom';


const AdminProductPage = () => {

    const[product,setProducts]=useState([]);


    const getallproducts=async()=>{

        try {
            const {data}=await axios.get('/api/v1/product/get-all-products')
            if(data.success){
                setProducts(data. getproducts)
            }

            
        } catch (error) {
            console.log(error)
            
        }

    }
    useEffect(()=>{
        getallproducts();


    },[])
  return (
    <Layout>
          <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">Items In Store</h1>
          <div className="d-flex flex-wrap">
            {product?.map((items) => (
              <Link
                key={items._id}
                to={`/dashboard/admin/product/${items._id}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/get-photo/${items._id}`}
                    className="card-img-top"
                    alt={items.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{items.name}</h5>
                    <p className="card-text">{items.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

    </Layout>


  )
}

export default AdminProductPage

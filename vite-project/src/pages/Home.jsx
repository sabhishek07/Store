import React, { useEffect, useState } from 'react'
import Layout from '../components/reusablecomponents/Layout'
import {useAuth}from '../context/auth'
import { toast } from 'react-toastify';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { ProductPrices } from './ProductPrices.js';
import { useCart } from '../context/Cart.jsx';

const Home = () => {

    const[auth,setAuth]=useAuth();
    const[products,setProducts]=useState([])
    const[Categories,setCategories]=useState([])
     const [checked, setChecked] = useState([]);
     const[radio,setRadio]=useState([])
     const [total, setTotal] = useState(0);
     const[cart,setCart]=useCart([]);
     const [page, setPage] = useState(1);
   
     


    const GetAllCategory=async()=>{
      try {

        const {data}=await axios.get('/api/v1/category/get-all-category')
        if(data){
          setCategories(data.getallcategory)
        }
        
      } catch (error) {
        console.log(error)
        
      }

    }
    useEffect(()=>{
      GetAllCategory();
    },[])
    const GetAllProduct=async()=>{
      try {

        const {data}=await axios.get('/api/v1/product/get-all-products')
        if(data){
          setProducts(data.getproducts)
        }
        
      } catch (error) {
        console.log(error)
        toast.error("Something Went Wrong")
        
      }

    }



    //get all category

    //handle category filter

    const HandleCategory=(value,id)=>{

      let checkeditem=[...checked]
      if(value){
       checkeditem.push(id)
      }
      else{
       
      checkeditem=checkeditem.filter((f)=>f!==id)
      }
      setChecked(checkeditem)


    }
  
    //get filter products

    const FilterProducts=async()=>{
      try {

        const {data}=await axios.post('/api/v1/product/get-filter-products',{checked,radio})
        if(data){
          setProducts(data.AllfilterProducts)
        }
        
      } catch (error) {
        console.log(error)
        toast.error("No match")
        
      }

    }
   
    
    useEffect(()=>{

     
        GetAllProduct();

   
    },[])
    useEffect(()=>{
      if(checked.length || radio.length){
        FilterProducts();

      }
      
      
    },[checked,radio])


    

  return (
    <Layout>

<div className="container-fluid row mt-3">
        <div className="col-md-2">
          <h6 className="text-center">Use This Filter With Price Filter</h6>
          <div className="d-flex flex-column">
            {Categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => HandleCategory(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {ProductPrices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-success"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9 offset-1">
          <h1 className="text-center">Items In Store</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`/api/v1/product/get-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p._id}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-secondary ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                     
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                     
                    }}
                   
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
       

    </Layout>
      
    
  )
}

export default Home

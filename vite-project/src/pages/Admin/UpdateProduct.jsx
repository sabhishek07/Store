import React, { useEffect, useState } from 'react'
import Layout from '../../components/reusablecomponents/Layout'
const { Option } = Select;
import { Select } from "antd";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import AdminMenu from '../../components/reusablecomponents/AdminMenu';
import axios from 'axios';

const UpdateProduct = () => {

   const navigate=useNavigate();
    const[name,setName]=useState("")
    const[description,setDescription]=useState("")
    const[image,setImage]=useState([])
    const[price,setPrice]=useState("")
    const[shipping,setShipping]=useState("")
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("")
    const[productCategory,setproductCategory]=useState([])
    const[id,setId]=useState('')
    const params=useParams();


    
    const GetSingleProduct=async()=>{
   
        try {
            console.log(params.id)
        const {data}=await axios.get(`/api/v1/product/get-single-product/${params.id}`)
            if(data){             
                setDescription(data.singlproduct.description)
                setName(data.singlproduct.name)  
                setPrice(data.GetSingleProduct.price) 
                setQuantity(data.GetSingleProduct.quantity) 
                setShipping(data.GetSingleProduct.shipping)
                setCategory(data.GetSingleProduct.category._id) 
                setId(data.GetSingleProduct._id)                  
            }
            else{
               toast.error("")
            }
            
        } catch (error) {
    
           
            toast.error(error)
                }
    }

      //eslint-disable-next-line

    useEffect(()=>{
        
        GetSingleProduct();
       
     },[params.id]) 

     //get all category
     const GetallCategory=async()=>{
        try {
        const {data}=await axios.get('/api/v1/category/get-all-category')
            if(data){             
                setproductCategory(data.getallcategory)                                 
            }
            else{
               toast.error("")
            }
            
        } catch (error) {
    
            console.log(error)
            toast.error(error)
                }
    }

    useEffect(()=>{
        GetallCategory(); 
     },[]) 


     const updatehandle=async(e)=>{
        e.preventDefault();


        try {

            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("image", image);
            productData.append("category", category._id);

            const {updatedata}=await axios.put(`/api/v1/product/get-update-product/${params.id}`,productData)
            
        } catch (error) {
            toast.error("Something Went Wrong")

            console.log(error)
            
        }

     }





  return (
   <Layout>

<div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Wanna Change? </h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {productCategory?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3 ">
                <label className="btn btn-outline-secondary col-md-12 ">
                  {image ? image.name : "Upload Image"}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-6">
                {/* {image && (
                  <div className="text-center">
                      <img
                    //   src={URL.createObjectURL(image)}
                      alt="product_photo"
                      height={"400px"}
                      className="img img-responsive"
                    />
                   
                  </div>
                )} */}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Product Name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Explain More About Product"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  min={1}
                  placeholder="Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  min={1}
                  placeholder="Quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary "onClick={updatehandle} >
                Update Item
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
     

   </Layout>
  )
}

export default UpdateProduct

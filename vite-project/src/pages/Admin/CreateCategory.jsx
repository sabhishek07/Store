import React, { useEffect, useState } from 'react'
import Layout from '../../components/reusablecomponents/Layout'
import Categoryform from '../../components/Categoryform';
import AdminMenu from '../../components/reusablecomponents/AdminMenu';
import { toast } from 'react-toastify';
import { Modal } from "antd";
import axios from 'axios';

const CreateCategory = () => {

    const [name,setName]=useState("")
    const[category,setCategory]=useState([])
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const[s1,sets1]=useState("")
 


    //handle submit

    const handleSubmit=async(e)=>{
        e.preventDefault();

         try {
            const {data}=await axios.post('/api/v1/category/create-category',{name})

            if(data.success){
               GetallCategory();
                toast.success("Category Created")
            }
            else{
                toast.error('Error')
            }


            
         } catch (error) {
            console.log(error)
            toast.error("Error While Submitting")
            
         }

    }

    

      
         const GetallCategory=async()=>{

            try {
        
                const {data}=await axios.get('/api/v1/category/get-all-category')
        
                if(data){
                    sets1("abhi")
                    setCategory(data.getallcategory)                        
                   
                }
                else{
                    toast.error("error")
                }
                
            } catch (error) {
        
                console.log(error)
                toast.error(error)
                
            }
    
        }

        useEffect(()=>{
            GetallCategory();
            console.log(s1)
            console.log("hii")
        
         
        
        
        
         },[]) 

         const updateCategory=async(e)=>{
            e.preventDefault();
             try {
     
                 const {data}=await axios.put(`/api/v1/category/update-category/${selected._id}`,{name})
     
                 if(data.success){
                     toast.success("Category updated ")
                     setSelected(null)
                     setUpdatedName("")
                     setVisible(false)
                     GetallCategory();
                 }
                 
                 
             } catch (error) {
     
                 toast.error("error While Updating")
                 console.log(error)
                 
             }
          


 

    }
    const handleDelete = async (id) => {
        try {
          const { data } = await axios.delete(
            `/api/v1/category/delete-category/${id}`
          );
          if (data.success) {
            toast.success(`category is deleted`);
    
            GetallCategory();
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error("Somtihing went wrong");
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
            <h1>Categories In Store</h1>
            <div className="p-3 w-50">
              <Categoryform
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                  
                  category?.map((c,id) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Modify
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
             visible={visible}
            >
              <Categoryform
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={updateCategory}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory

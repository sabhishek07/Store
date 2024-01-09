import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/user/Dashboard'
import Private from './Routes/Private'
import AdminRoute from './Routes/AdminRoute'
import AdminDashboard from './pages/Admin/AdminDashboard'
import CreateCategory from './pages/Admin/CreateCategory'
import CreateProduct from './pages/Admin/CreateProduct'
import AdminProductPage from './pages/Admin/AdminProductPage'
import UpdateProduct from './pages/Admin/UpdateProduct'
import CartPage from './pages/CartPage'




function App() {


  return (
    <>
    <Routes>
      <Route path='/'element={<Home/>}/>
      <Route path='/cart'element={<CartPage/>}/>

      //nested routing
      <Route path="dashboard"element={<Private/>}>
      <Route path='user'element={<Dashboard/>}/>
      </Route>
      //nested routing
      <Route path='/dashboard'elment={<AdminRoute/>}>
        <Route path='admin'element={<AdminDashboard/>}/>
        <Route path='admin/create-category'element={<CreateCategory/>}/>
        <Route path='admin/create-product'element={<CreateProduct/>}/>
        <Route path='admin/get-products'element={<AdminProductPage/>}/>
        <Route path='admin/product/:id'element={<UpdateProduct/>}/>
      </Route>
     
      <Route path='/contact'element={<Contact/>}/>
      <Route path='/about'element={<About/>}/>
      <Route path='/register'element={<Register/>}/>
      <Route path='/login'element={<Login/>}/>
    </Routes>
 
    </>
  )
}

export default App

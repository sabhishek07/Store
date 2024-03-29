import axios from "axios";
import {  createContext, useContext, useEffect, useState } from "react";


const CartContext=createContext();

const CartProvider=({children})=>{
    const [cart,setCart]=useState([])



    useEffect(()=>{
       let cartpresent=localStorage.getItem('cart')
       if(cartpresent){
        setCart(JSON.parse(cartpresent))
       }

    },[])



    return(
        <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export  { useCart, CartProvider };
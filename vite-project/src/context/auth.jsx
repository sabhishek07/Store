import axios from "axios";
import {  createContext, useContext, useEffect, useState } from "react";

const AuthContext=createContext();

const AuthProvider=({children})=>{
    const [auth,setAuth]=useState({
        user:null,
        token:""
    })
    //default axios
  axios.defaults.headers.common["Authorization"] = auth?.token;

    useEffect(()=>{

      const data=localStorage.getItem('auth');

      if(data){
        const modifydata=JSON.parse(data);

        setAuth({
          ...auth,
          user:modifydata.checkloginuser,
          token:modifydata.token
        })
      }
      //eslint-disable-next-line

    },[])

    return(
        <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export  { useAuth, AuthProvider };
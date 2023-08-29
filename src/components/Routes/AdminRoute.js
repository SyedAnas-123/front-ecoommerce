import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/Auth';
import Spinner from '../Spinner';


export default function AdminRoute(){
    const [ok,setOk]=useState(false)
    const [auth,setAuth] = useAuth()

    useEffect(()=>{
        const authCheck = async()=>{

            const res= await axios.get("https://angry-ring-jay.cyclic.app/api/v1/auth/admin",{

                headers:{
                    "Authorization" : auth?.token
                }
            })
        
            if(res.data.ok){
                setOk(true)
            }
            else{
                setOk(false)
            }
        }
        //checking token recienves or not
        if(auth?.token) authCheck()
        console.log(auth.token)


    },[auth?.token])

    return ok? <Outlet/> : <Spinner path=''/> ;

}
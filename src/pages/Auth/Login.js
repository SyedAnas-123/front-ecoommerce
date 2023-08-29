import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
// import { useNavigate, useLocation } from "react-router-dom";
import { useNavigate,useLocation} from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/Auth';




const Login = () => {


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //using auth hook from auth.js 
    const [auth, setAuth] = useAuth()

    const navigate = useNavigate();
    const location = useLocation();





    const handleSubmit = async (e) => {

        e.preventDefault();
        try {

            const res = await axios.post("https://angry-ring-jay.cyclic.app/api/v1/auth/login",{
            email,password,
              });
            if (res.data.success) {

                toast.success(res.data.message)
                   

            
                // abh jbh hamari succes req jaeegi to isko set krdengen mtkb ke agr user succesfully login hojata he to dtaashow kr de bha homepage pr abhii filahlhmmisme sari detailsaut token mungwaeen gehn jo homepage pr showkreega see authcontroller file at the end we send user detailsand token from their and we are just getting that databy same methoid as in  handle subm,it fuicntions 

                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,

                });
                //loacalstorage me  item set krwa rha phr auth aik avriable pass kr diya or data get karato usko json string me convert kr rha kuke json dta nh leta ye .
                localStorage.setItem('auth', JSON.stringify(res.data))



                navigate(location.state || '/'); // spinner me aikiadditionak state ke property melocatiomn ko pass krwa diya orlogin me wohii loaction access krlengen agr login hoga to 

            }
            else {
                toast.error(res.data.message)
            }





        } catch (error) {
            console.log(error)
            toast.error('Something went wrong In Login');

        }


    }


    return (
        <>
            <Layout title="Register - Ecommerce App">
                <div className="register">
                    <div className="box">
                        <form action=""  onSubmit={handleSubmit}  >
                            <h2>Log In</h2>


                            <div className="inputBox">
                                <input type="text" value={email} id='exampleInputEmail'
                                    onChange={(e) => setEmail(e.target.value)}
                                    required />
                                <span>Enter Your  Email</span>
                                <i></i>
                            </div>

                            <div className="inputBox">
                                <input type="password" value={password} id='exampleInputPassword'
                                    onChange={(e) => setPassword(e.target.value)}
                                    required />
                                <span>Enter Your Password</span>
                                <i></i>

                            </div>


                            <input type="submit" value="L O G I N" />
                            
                            <input className='signup'  type="submit" value="S I G N U P" onClick={()=>{navigate('/register')}}/>
                            <div className="links" onClick={()=>{navigate('/forgot-password')}}>
                            <button type="button" className="btn btn-outline-primary" style={{marginTop:"35px",background:"#45f3ff", color:"black",border:"3px solid black"}}>FORGOT PASSWORD</button>
                            </div>
                           



                        </form>

                    </div>


                </div>





            </Layout>


        </>
    );
}


export default Login;

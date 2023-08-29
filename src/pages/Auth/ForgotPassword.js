import React , {useState} from 'react';
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const ForgotPassword = () => {
    



    const [email, setEmail] = useState("")
    const [newPassword, setnewPassword] = useState("")
    const [answer, setAnswer] = useState("")

  //using auth hook from auth.js 


    const navigate =useNavigate();
 





    const handleSubmit = async (e) => {

        e.preventDefault();
        try {

            const res = await axios.post("https://angry-ring-jay.cyclic.app/api/v1/auth/forgot-password"
                , { email, newPassword ,answer});

            if ( res.data.success) {

                toast.success(res.data.message)
                   
                

                navigate( '/login'); // spinner me aikiadditionak state ke property melocatiomn ko pass krwa diya orlogin me wohii loaction access krlengen agr login hoga to 

            }
            else {
                toast.error(res.data.message)
            }





        } catch (error) {
            console.log(error)
            toast.error('Something went wrong');

        }


    }
  return (
    <Layout title="Fotgot-Password - Ecommerce App">
    <div className="register">
        <div className="box">
            <form action=""  onSubmit={handleSubmit} >
                <h2>Forgot Password</h2>


                <div className="inputBox">
                    <input type="text" value={email} id='exampleInputEmail'
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                    <span>Enter Your  Email</span>
                    <i></i>
                </div>


                <div className="inputBox">
                    <input type="text" value={answer} id='exampleInputEmail'
                        onChange={(e) => setAnswer(e.target.value)}
                        required />
                    <span>Enter your fav  Dish Name</span>
                    <i></i>
                </div>


                <div className="inputBox">
                    <input type="password" value={newPassword} id='exampleInputPassword'
                        onChange={(e) => setnewPassword(e.target.value)}
                        required />
                    <span>Enter Your New Password</span>
                    <i></i>

                </div>


                <input type="submit" value="R E S E T  P A S S W O R D" />
                <div className="links" onClick={()=>{navigate('/forgot-password')}}>
                   
                
              
                
                
                </div>



            </form>

        </div>

    </div>





</Layout>
  );
}

export default ForgotPassword;

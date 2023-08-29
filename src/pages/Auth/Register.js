import { useState } from 'react';
import React from 'react';
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [answer, setAnswer] = useState("")


  const navigate = useNavigate()
  //form funtion 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://angry-ring-jay.cyclic.app/api/v1/auth/register", {
        name, email, password, phone, address,answer
      });
      if (res.data.success) {
        toast.success(res.data.message, {
          duration: 7000
        })
        navigate('/login')
      }
      else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Somethhing went wrong in register Api")

    }
  }
  return (

    <Layout title="Register - Ecommerce App">
      <div className="register">
        <div className="box">
          <form action="" onSubmit={handleSubmit}>
            <h2>Registration</h2>

            <div className="inputBox">
              <input type="text" value={name} id="exampleInputEmail"
                onChange={(e) => setName(e.target.value)}

                required />
              <span> Enter Your Name</span>
              <i></i>


            </div>
            <div className="inputBox">
              <input type="text" value={email} id="ExampleInputEmail"
                onChange={(e) => setEmail(e.target.value)}

                required />
              <span>Enter Your  Email</span>
              <i></i>
            </div>

            <div className="inputBox">
              <input type="password" value={password} id="ExampleInputPassword"
                onChange={(e) => setPassword(e.target.value)}


                required />
              <span>Enter Your Password</span>
              <i></i>

            </div>
            <div className="inputBox">
              <input type="text" value={phone} id="ExampleInputEmail"
                onChange={(e) => setPhone(e.target.value)}

                required />
              <span>Enter Your Phone</span>
              <i></i>


            </div>
            <div className="inputBox">
              <input type="text" value={address} id="ExampleInputEmail"
                onChange={(e) => setAddress(e.target.value)}

                required />
              <span>Enter Your Address</span>
              <i></i>
            </div>


            <div className="inputBox">
              <input type="text" value={answer} id="ExampleInputEmail"
                onChange={(e) => setAnswer(e.target.value)}
                required />
              <span>Which  is your Fav  Dish</span>
              <i></i>
            </div>




            <input type="submit" value="S U B M I T" />



          </form>

        </div>

      </div>





    </Layout>
  );
}

export default Register;

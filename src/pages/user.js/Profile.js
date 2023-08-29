import React from "react";
import Layout from "./../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/Auth";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
    //COMTEXT
    const [auth, setAuth] = useAuth();

    //STATE
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    //GET USER DATA DESTRUCTURING means filllign user data in by ourselves
    useEffect(() => {
        const { email, name, phone, address } = auth?.user;
        setName(name);
        setAddress(address);
        setPhone(phone);
        setEmail(email);
    }, [auth?.user]);

    //FORM HANDLE FUNCTION
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
               "https://angry-ring-jay.cyclic.app/api/v1/auth/profile ",

                {
                    name,
                    email,
                    password,
                    phone,
                    address,
                },
                {
                    headers: {
                        Authorization: auth?.token,
                    },
                },
            );
            if (data?.error) {
                toast.error(data?.error);
            } else {
                setAuth({ ...auth, user: data?.updatedUser });
                //ALSO WANT TO UPDATE LOCAL STORAGE
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls); //separtely parse is liye kr rhen hn ku ke 2 objet hn haamre pass
                ls.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("Profile Updated Successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error("Somethhing went wrong in Updating  User");
        }
    };

    return (
        <Layout title={"Your Profile"}>
            <div className="container-fluid m-4 p-4">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="usaid register mb-10">
                            <div className="box">
                                <form className="sajid" action="" onSubmit={handleSubmit}>
                                    <h2>U S E R P R O F I L E</h2>

                                    <div className="inputBox">
                                        <input
                                            type="text"
                                            value={name}
                                            id="exampleInputEmail"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <span> Enter Your Name</span>
                                        <i></i>
                                    </div>
                                    <div className="inputBox">
                                        <input
                                            className="lazzat"
                                            type="text"
                                            value={email}
                                            id="ExampleInputEmail"
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled
                                        />

                                        <i></i>
                                    </div>

                                    <div className="inputBox">
                                        <input
                                            type="password"
                                            value={password}
                                            id="ExampleInputPassword"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <span>Enter Your Password</span>
                                        <i></i>
                                    </div>
                                    <div className="inputBox">
                                        <input
                                            type="text"
                                            value={phone}
                                            id="ExampleInputEmail"
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                        <span>Enter Your Phone</span>
                                        <i></i>
                                    </div>
                                    <div className="inputBox">
                                        <input
                                            type="text"
                                            value={address}
                                            id="ExampleInputEmail"
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                        <span>Enter Your Address</span>
                                        <i></i>
                                    </div>

                                    <input type="submit" value="U P D A T E" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;

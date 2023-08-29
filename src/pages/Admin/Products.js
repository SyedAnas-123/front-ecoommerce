
// hur product ko idhr mapkrwa kr laeen gen
import React from 'react';
import { useState, useEffect } from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/Auth';
// through link we acn aslo see single product
import { Link } from 'react-router-dom'

const Products = () => {


    const [products, setProducts] = useState()
    const [auth, setAuth] = useAuth()

    //GETTING ALLPRODUCTS
    const getAllproducts = async () => {

        try {
            const { data } = await axios.get("https://angry-ring-jay.cyclic.app/api/v1/product/get-product", {
                headers: {
                    "Authorization": auth?.token
                }
            }
            )
            setProducts(data.products);


        } catch (error) {
            console.log(error)
            toast.error('Something went wrong in getting All Products')

        }
    }



    //ABH Y JO PRODUCTS GET KIYE HEN INKO INITIAL TIMEME CALL KRNAN HER TO USING LIFE CYCLEMETHIOD

    useEffect(() => {

        getAllproducts();
    }, [])





    return (
        <Layout>
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1 className='text-center'> All Products List</h1>
                    {/* DOING MAPPING IFPRODUCTS GET */}
                    <div className="d-flex">
                        {products?.map((p) => (
                            //foralsoshowing singlrproduct onthe basiis on slug means directly get single product from slug and get thtab slug from p.slug insated means we didnot use singl_product route

                            <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='product_link'>
                                <div className="card m-2" style={{ width: '18rem' }} key={p._id}>
                                    <div>
                                        {/* insaed of uysing photo route we are using it dynamically and directly tcalld its route  */}
                                        <img src={`https://angry-ring-jay.cyclic.app/api/v1/product/get-photo/${p._id}`} className="card-img-top" alt={p.name} /> 
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text"> {p.description}</p>
                                        </div>
                                    </div>
                                </div>


                            </Link>

                        ))}
                    </div>



                </div>
            </div>
        </Layout>
    );
}

export default Products;

// thisapge is for agr hmcategories pr click kren eto uskki details ajaen means wo category new page m khul jaeee
import React from 'react';
import Layout from '../components/Layout/Layout';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/Auth';
import { useNavigate } from 'react-router-dom';

const Categoryproduct = () => {
    const navigate=useNavigate()

    // destructeing products and category  from product category controller
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])

    const [auth] = useAuth()

    const params = useParams()

    useEffect(() => {
        //checking slugif we getit this showit othewrwise not 
        if (params?.slug) getProductByCategory()

    }, [params?.slug])

    const getProductByCategory = async () => {
        try {
            //get all the data 
            const { data } = await axios.get(`https://angry-ring-jay.cyclic.app/api/v1/product/product-category/${params.slug}`, {
                headers: {
                    Authorization: auth?.token,
                },
            })


          
            setProducts(data?.products)
            setCategory(data?.category)

        } catch (error) {
            console.log(error)

        }
    }
    return (
        <Layout>

            <div className=" productcat container mt-3">
                <h4 className='text-center mt-6'>Category - {category?.name}</h4>

                <h6 className='text-center mt-1'>{products?.length} Results Found</h6>
                <div className="row">

                    <div className="col-md-9 offset-1">
                        
                        <h1 className="noproducts text-center ">Products Related To {category.name} Category</h1>
                        <div className="d-flex ">
                            {/* getting products onscreen */}
                            {products?.map((p) => (


                                <div className=" card m-2" style={{ width: '18rem' }} key={p._id}>
                                    <div>
                                        {/* Getting products oon screeen */}
                                        <img src={`https://angry-ring-jay.cyclic.app/api/v1/product/get-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="mama card-text"> {p.description}</p>
                                            <p className="card-text">$ {p.price}</p>

                                            <button className="btn4 btn-dark ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                            <button className="btn4 btn-dark ms-1">Add To Cart</button>


                                        </div>
                                    </div>
                                </div>




                            ))}

                        </div>
                       
                    </div>

                </div>
            </div>

        </Layout>
    );
}

export default Categoryproduct;

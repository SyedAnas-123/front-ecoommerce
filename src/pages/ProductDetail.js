// initial time mehmmko product ki details chaheyehn nameopic etc to wo kreengen
import React from "react";
import { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/Auth";

const ProductDetail = () => {
  const [auth] = useAuth();
  const params = useParams();
  //CREATIGNA NMEW STATE INWHIHC WE HOLD ALL THE PRODUCTS
  const [product, setProduct] = useState([]);

  //GET PRODUCT ININITIAL TIME usinf use effect of singlrproduct
  useEffect(() => {
    if (params?.slug) getproduct(); //if agr slug milta to tbh hi product show krowrna ni
  }, [params?.slug]);

  //GET PRODUCTS
  const getproduct = async () => {
    try {
      const { data } = await axios.get(
        `https://angry-ring-jay.cyclic.app/api/v1/product/singleproduct/${params.slug}`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      setProduct(data?.products);
      //and now to get it in initialtimewe uise use effect
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container mt-5">
        <div className="col-md-6">
          {product && (
            <img
              src={`https://angry-ring-jay.cyclic.app/api/v1/product/get-photo/${product._id}`}
              className="card-img-top"
              alt={product.name}
            />
          )}
        </div>

        <div className="col-md-6 text-center">
          <h1 className="osaf">P R O D U C T D E T A I L S</h1>
          <h6 className="osaf2">Name : {product.name}</h6>
          {product.category && (
            <h6 className="osaf3">Category: {product.category.name}</h6>
          )}
          <h6 className="osaf4">Description : {product.description}</h6>
          <h6 className="osaf5">Price : {product.price}</h6>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;

import Layout from "../components/Layout/Layout";
import React, { useState, useEffect } from "react";

import { useCart } from "../context/cart";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";

// import Item from "antd/es/list/Item";





const CartPage = () => {
  const [cart, setCart] = useCart()
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()
  



  //TOTAL PRICE CALCULATION

  const totalPrice = () => {
    try {
      let total = 0
      cart?.map(item => { total = total + item.price });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      })


    } catch (error) {
      console.log(error)
    }
  }



  // DELETE CART
  const removeCardItem = (pid) => {
    try {

      //first access cart
      let myCart = [...cart]
      let index = myCart.findIndex(item => item._id === pid)
      myCart.splice(index, 1)
      setCart(myCart);
      // ABH REMOVE KRNE PR LOCAL STORAGE SE REMOVE NI HORHA THA TO USKO DET KRENGEN
      localStorage.setItem('cart', JSON.stringify(myCart))

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {/* IN THIS H1 WE WA TO SHOW THTA CART ME ITEM HEN YA NH ? */}
            <h1 className="text-center bg-light p-2 mb-1">
              {/* FIRTS CHECK USER IS LOGIN OR NOY ? */}
              {`Hello ${auth?.token && auth?.user?.name} `}
              {/* NOW HOW MANY CARTS AVAILABLE IN CART  */}
              <h4 className="text-center">
                {cart?.length ? `You Have ${cart.length} Items in Your Cart ${auth?.token ? " " : "Please Login to Checkout"}` : "Your Cart Is Empty"}


              </h4>
            </h1>
          </div>

        </div>
        <div className="row">
          <div className="col-md-8">
            {/* MAPPING and checking CARD ITEMS */}
            {
              cart?.map((p) => (
                <div className="row m-2 p-3 card flex-row">
                  {/* FOR IMAGE RENDERING */}
                  <div className="col-md-4">
                    <img src={`https://angry-ring-jay.cyclic.app/api/v1/product/get-photo/${p._id}`} className="card-img-top" alt={p.name} width="125px" height="120px" />

                  </div>
                  {/* FOR DETAILS RENDERING */}
                  <div className="col-md-4">
                    <h5>{p.name}</h5>
                    {/* <p>{p.description.substring(0, 30)}</p> */}
                    <h5>Price :   $ {p.price}</h5>
                    {/* REMOVE BUTTON ON THE BASIS OF ID */}
                    <button className="btn btn-danger" onClick={() => removeCardItem(p._id)}>Remove</button>
                  </div>

                </div>
              ))

            }
          </div>
          <div className="col-md-4 text-center">
            <h2 className="mt-1">Cart Summary</h2>
            <p>Total | Checkout | Payment </p>
            <hr />
            <h4>Total : {totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button className="btn btn-outline-success"
                    onClick={() => navigate('/dashboard/user/profile')}>
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {
                  auth?.token ? (
                    <button className="btn btn-outline-success" onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                  ) : (
                    <button className="btn btn-outline-success" onClick={() => navigate('/login', { state: '/cart' })} >Plz Login To Checkout</button>

                  )
                }

              </div>
            )}

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;

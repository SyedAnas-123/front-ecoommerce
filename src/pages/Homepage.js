import React from 'react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/Auth';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//for filtering
import { Checkbox, Radio } from 'antd';
import { useCart } from '../context/cart';
import { PriceFilter } from '../components/PriceFilter';
import { toast } from 'react-hot-toast';
//for prices filtering







const Homepage = () => {
  //FOR CART 
  const [cart, setCart] = useCart()

  const navigate = useNavigate()
  const [auth] = useAuth()
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  //formultiple filters
  const [checked, setChecked] = useState([])
  ///PRICES FILTER
  const [radio, setRadio] = useState([])
  //getiign allcategorires first

  //FOR PAGINATION
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)

  const [loading, setLoading] = useState(1)



  //get TOTAL COUNT FOR PAGINAION 
  const getTotal = async () => {
    try {
      const { data } = await axios.get("https://angry-ring-jay.cyclic.app/api/v1/product/product-count", {
        headers: {
          "Authorization": auth?.token
        }
      });
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return
    loadMore();

  }, [page])


  //LAODMORE
  const loadMore = async () => {

    try {
      setLoading(true)

      const { data } = await axios.get(`https://angry-ring-jay.cyclic.app/api/v1/product/product-list/${page}`, {
        headers: {
          "Authorization": auth?.token
        }
      })
      setLoading(false)
      setProducts([...products, ...data.products])

    } catch (error) {
      console.log(error)
      setLoading(false)

    }
  }

  const getAllCategory = async () => {

    try {

      const { data } = await axios.get("https://angry-ring-jay.cyclic.app/api/v1/category/getAll-category")

      if (data?.success) {
        setCategories(data.category);

      }

    } catch (error) {
      console.log(error)

    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);


  //GET PRODUCTS
  const getAllProducts = async () => {


    try {
      setLoading(true)
      const { data } = await axios.get(`https://angry-ring-jay.cyclic.app/api/v1/product//product-list/${page}`, {
        headers: {
          "Authorization": auth?.token
        }
      })
      setLoading(false)
      setProducts(data.products)

    } catch (error) {
      setLoading(false)
      console.log(error)
    }

  };



  //FILTERING ON CATEGORIES

  //FOR FILTERING CATEGORIE E FIRST MAKE CHECK STATE THEN ITS MAKEITS FUCTION AND CALL THE TARGET VCALUE FOR CATEGORIES AND ITS ID 
  // receiving value and id as a paramter as we callesinits fuction and ontyhe basius opf categories this we get catogeries filters 
  const handleFilter = (value, id) => {
    let all = [...checked]  //checkedemjo bh value thn woinittail all m,e store hojaengen 
    if (value) {
      //jo value get kr rrhne hn parameter meuskopush kengen id ke abse pr and sue push bxz we havearray
      all.push(id)
    }
    else {
      all = all.filter(c => c !== id);
    }
    setChecked(all);

  }

  useEffect(() => {
    //condiitojnm on the bassis of filter
    if (!checked.length || !radio.length) getAllProducts();

  }, [checked.length, radio.length])


  useEffect(() => {
    if (checked.length || radio.length) filterProduct()

  }, [checked, radio])

  //GET PRODUCTS ON THE BASIS OF FILTERS

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("https://angry-ring-jay.cyclic.app/api/v1/product/product-filter", { checked, radio }, {
        headers: {
          "Authorization": auth?.token
        }
      })
      setProducts(data?.products)
    } catch (error) {
      console.log(error)


    }
  }
  return (
    <Layout title={"All Products - Best Offers"} >
      {/* banner image */}
      <img
        src="/images/banner.png"
        className="banner-img mt-20%"
        alt="bannerimage"
        width={"100%"}
      />
      {/* banner image */}
      <div className="homepage row mt-3">
        <div className=" mapping col-md-3 ">
          <h4 className="heading text-center">Filter By Ctaegory</h4>
          {/* GETTI9NG ALLTHE ACTEGORIES HERE FOR Filtering CATEGORIES */}
          {/* FILTERING CATEGORIES */}
          <div className="  d-flex flex-column m-5">
            {categories?.map((c) => (
              <Checkbox className="anas" key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>


          {/* FILTERIING PRICES */}
          <h4 className="heading2 text-center">Filter By price</h4>
          {/* GETTI9NG ALLTHE ACTEGORIES HERE FOR MULTIPLE CATEGORIES */}
          <div className=" d-flex flex-column m-5">
            <Radio.Group onChange={e => setRadio(e.target.value)}>
              {PriceFilter?.map((p) => (
                <div key={p._id}>
                  <Radio className='anas' value={p.array}> {p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          {/* addding buttton for refring of filters */}
          <div className=" d-flex flex-column m-5">
            <button className='hasnain btn btn-warning'
              onClick={() => window.location.reload()}>R E S E T

            </button>
          </div>
        </div>



        <div className="col-md-9">

          <h1 className="allproducts text-center" style={{fontFamily:"Playfair Display, sans-serif"}}>All Products</h1>
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

                    {/* ADD TO CART AND DETAILS BUTTON NOW ADD IN HEADER */}
                    <button className="btn4 btn-dark ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                    {/* cart ko initial as is it rkho means spread kr diya cart k undr jo bh value he or p ke undr jo  bh data bhe usko isme ad kr do */}
                    <button
                      className="btn4 btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p])
                        // ALSO SET INTO LOCAL STORAGE BCZ REFRESH KRNE KE BAD BAR BAR JA RHA HE CART KE PRODUCTS but phr bh data chalajeega to uske liye hmko isko initial time em get krnahe to is ke liye hm ne jo cart ka cintext banaya the usme krwasd dengen set

                        localStorage.setItem('cart', JSON.stringify([...cart, p]))
                        toast.success('Item Added Successsfully')
                      }}>

                      Add To Cart</button>


                  </div>
                </div>
              </div>




            ))}

          </div>
          <div className='m-2 p-3'>
            {products && products.length < total && (
              <button className='btn10 btn' onClick={(e) => { e.preventDefault(); setPage(page + 1) }}>
                {loading ? "Loading" : "load more...."}
              </button>
            )}</div>
        </div>
      </div>

    </Layout>
  );
}

export default Homepage;

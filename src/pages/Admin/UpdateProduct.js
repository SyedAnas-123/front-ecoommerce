//FIRST COOPY WHOLE CREATE PRODUCT PAGE. and updatign the product 
import React from 'react';
import { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import { useNavigate, useParams} from "react-router-dom";
import toast from 'react-hot-toast';
//Destructuring from select option which helpsus in drop down menus 
import { Select } from 'antd';

import { useAuth } from '../../context/Auth';
const { Option } = Select;
const UpdateProduct = () => {
    //USING PARAMS FOR GETTIGN URL
    const params = useParams()
    const navigate = useNavigate();
    //multiple states bcz want to access multiple data
    //1 :gettting all categories
    const [categories, setCategories] = useState([])
  
    // 2: for getting name
    const [name, setName] = useState("")
  
    // 2: for getting description
    const [description, setDescription] = useState("")
  
    // 2: for getting category
    const [quantity, setQuantity] = useState("")
  
    // 2: for getting photos
    const [ shipping,setShipping] = useState("")
  
    // 2: for getting price
    const [price, setPrice] = useState("")
  
    // 2: for getting single category
    const [category, setCategory] = useState("")
    // 2: for getting photo
    const [photo, setPhoto] = useState("")
    //AUTH FOR TOKEN
    const[auth] =useAuth()
    //gettind if for picture in updating page
    const[id,setId] = useState("")
  
  //NOW  FOR GETTING OF SINGLE PRODUCT 
  const getSingleProduct =async ()=>{

    try {
        //directly destructing data and send network req using backticks bcz params means url jo hm ne product.js route me pheke hi bana diya tha directly bagair api use kre usko emasn url ko  get kr lengen yaahn paarms se us me slug bh tha he directly
        const { data } = await axios.get(`https://angry-ring-jay.cyclic.app/api/v1/product/singleproduct/${params.slug}`);
        //jo bh data  hmko get hoga na usme hm  fulfillkrwa dnegen jtne bh upr state hen meas initial state jo upr hen un me bcz wo empty hn
        // data ke undr product ki  jo name he uska name setname me save krwadiya
        setName(data.products.name);
        setCategory(data.products.category._id);
        setDescription(data.products.description);
        setPrice(data.products.price);
        setQuantity(data.products.quantity);
        setId(data.products._id);


        
    } catch (error) {
        console.log(error)
           
    }
  };
  useEffect(()=>{
    getSingleProduct();
    //eslint-disable-next-line
  },[])
  

    //HERE GETTING ALL CATEGORIES FIRST AS WE MAKEA STATE FOR IT .
  
    const getAllCategory = async () => {
  
      try {
        //destructing respsponse directly and using axiox to make a network req of get in bachekend of route see we craete a roiuter of get category in backeend and here we aregetting those categories in our frontend
  
        const { data } = await axios.get("https://angry-ring-jay.cyclic.app/api/v1/category/getAll-category")
        //agr data is true or milgaya  to categories ko jo bh data he us se fulfull kr dengen 
        if (data?.success) {
          setCategories(data.category);
  
        }
  
      } catch (error) {
        console.log(error)
        toast.error('Somehing went wrong in getting category ')
  
      }
    };
  
  
    useEffect(() => {
      // we get it adn do map frombootstrap
      getAllCategory();
  
    }, [])
  
  
  
  
    //-----------------------------CRAETING PRODUCT FUCNTION MEANS FOR CREATING THE PRDUCTION BUTTON ----------------------
    //create product function
  
  
  
    const handleUpdate = async (e) => {
      e.preventDefault();
      try {
        //through thisb we wilget photoseasily 
        const productData = new FormData();
        productData.append("name", name);
        productData.append("description", description);
        productData.append("price", price);
        productData.append("quantity", quantity);
        //if receives photo then show it
        photo &&  productData.append("photo", photo);

        productData.append("category", category);
  
  
  
        const { data } = axios.put(`https://angry-ring-jay.cyclic.app/api/v1/product/update-product/${id}`, productData,{
          headers: {
            "Authorization": auth?.token
          }
        } );
  
  
        if (data?.success) {
          toast.error("error in updating product");
         
        }
        else {
          toast.success("Product Updated Successfully");
          navigate("/dashboard/admin/products")
  
        }
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
      }
    };


    // ------------------------------DELETE FUCNTION -------------------------
    const handleDelete = async () =>{
        try {
            //agr glti se prduct deleet hojaee to 
            let answer = window.prompt('Are u Sure You Want To Delete This Product')
            if(!answer) return;
            const {data} = await axios.delete(`https://angry-ring-jay.cyclic.app/api/v1/product/delete-product/${id}`)
            console.log(data)
            toast.success('Product Deleted Successfully')
            navigate('/dashboard/admin/products')
             
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong in deleting the Product")
        }

    }
  return (
    <Layout title={"Dashboard - Create Products"}>
      <div className="container-fluid m-4 p-4">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="hello col-md-9">
            <h1>Update  Product</h1>
            <div className="m-1 w-75">
            <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              {/* work on photo */}
              <div className="mb-3">
                <label className='btn btn-outline-secondary col-md-12'>
                  {/* if we got photo then show it name  and if noot then ettx*/}
                  {photo ? photo.name : "Upload Photo"}
                  {/* aceept means accept in any form  */}
                  <input type="file" name="photo" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} hidden />
                </label>
              </div>

              {/* getting image from url and this is such typrof image preview */}
              
              <div className="mb-3">
                {/* So, this code block is conditionally rendering an image element. If the photo is available, it shows that image using the temporary URL. Otherwise, it fetches the image from the server using the product's id.  */}

                {photo ? (
                  <div className="text-center">
                    <img src={URL.createObjectURL(photo)} alt="product_photo" height={'200px'} className="img img-responsive" />
                  </div>
                ):(
                    <div className="text-center">
                    <img src={`https://angry-ring-jay.cyclic.app/api/v1/product/get-photo/${id}`} alt="product_photo" height={'200px'} className="img img-responsive" />
                  </div>

                )}

              </div>
              {/* FOR WRITING THE NAMES  */}
              <div className="mb-3">
                <input type="text" value={name} placeholder='Write a Name' className='form-control' onChange={(e) => setName(e.target.value)} />
              </div>
              {/* FOR WRITING THE DESCRIPTION */}
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              {/* FOR CREATING THE PRICE */}
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              {/* FORCREATING THE PRICE */}
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              {/* FOR CRAETING SHIPPING */}

              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  //for its use in updatign product
                  value={shipping ? "yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn3 btn-warning" onClick={handleUpdate}>
                  U P D A T E   P R O D U C T
                </button>
              </div>
              <div className="mb-3">
                <button className="btn3 btn-danger" onClick={handleDelete}>
                   D E L E T E   P R O D U C T
                </button>
              </div>


            </div>


          </div>
        </div>
      </div>


    </Layout>

  );
}

export default UpdateProduct;

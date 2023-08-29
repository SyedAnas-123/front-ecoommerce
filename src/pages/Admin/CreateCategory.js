//wotk on edit btn use libraray antdesign(antd)also import cs file
import React from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
// using useeffecta nd use state for holding the dtaa as in auth we di9d
import { useEffect, useState } from 'react';
import toast from "react-hot-toast"
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm';
import { useAuth } from '../../context/Auth';
import { Modal } from 'antd';



const CreateCategory = () => {
  //using [ ]in use state bcz multiple value rahengen 
  const [auth] = useAuth()
  const [categories, setCategories] = useState([])
  //this will be passed as a props in category form 
  const [name, setName] = useState("")
  //for update we use modelthis is for that 
  const [open, setOpen] = useState(false)
  //this is for viewing category page inpopup of modal
  const [selected, setSelected] = useState(null)
  const [updatedName, setUpdatedName] = useState("")


  //-----------CRAETING CATEGORY FORM FUNCTION ----------------------//

  //handle form submit function
  const handleSubmit = async (e) => {

    e.preventDefault() //form ka default fucntion close kr do hm apna fucntion likhen gen

    try {

      //sending network req making variabland desturtingallthe data  and passign name value 

      const { data } = await axios.post("https://angry-ring-jay.cyclic.app/api/v1/category/create-category", { name }, {

        headers: {
          "Authorization": auth?.token
        }
      });

      if (data?.success) {

        toast.success(`${name} Category is Created Successfully`);
        getAllCategory()

      }

      else {

        toast.error(data.message);

      }

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong in Input Form")
    }

  }



  //makingn a functionnin  from which we get all categories

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

  //now we set themin uper function now we get them *****thorough use effect

  useEffect(() => {
    // we get it adn do map frombootstrap
    getAllCategory();

  }, [])


  // -------------------------------UPdating category -----------------------------

  //FORMODAL;WORK updatea ctegory
  const handleUpdated = async (e) => {
    e.preventDefault()
    try {
      //destructuring data for updating the category also passing id bcz we have it in our route
      const { data } = await axios.put(`https://angry-ring-jay.cyclic.app/api/v1/category/update-category/${selected._id}`, { name: updatedName }, {
        headers: {
          "Authorization": auth?.token
        }
      })

      //no chekingif it is true 
      if (data.success) {
        toast.success(`${ updatedName} Category Updated Successfully`);
        //and after it updated formnull kr dengen 
        setSelected(null);
        //namebh empty hojaeega
        setUpdatedName("");
        //y is liye ke sety hote hi hamara popup chala jaee
        setOpen(false);
        //initialtime meupdated value milee to  get allcategory callkr lengen
        getAllCategory();

      }


      else {
        toast.error(data.message)
      }


    } catch (error) {
      toast.error('Something went Wrong while Updating')
    }
  };



  
  // -------------------------------DELETING CATEGORY  -----------------------------

  //FORMODAL;WORK updatea ctegory
  const handleDeleted = async(pId) => {
    
    try {
      //destructuring data for updating the category also passing id bcz we have it in our route
      const { data } = await axios.delete(`https://angry-ring-jay.cyclic.app/api/v1/category/delete-category/${pId}`,  {
        headers: {
          "Authorization": auth?.token
        }
      })

      //no chekingif it is true 
      if (data.success) {
        toast.success(`${name} Category Deleted Successfully`);    
        //initialtime meupdated value milee to  get allcategory callkr lengen
        getAllCategory();

      }


      else {
        toast.error(data.message)
      }


    } catch (error) {
      toast.error('Something went Wrong while Updating')
    }
  };



  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-4 p-4">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-8">
            <h1>Manage Category</h1>
            <div className="p-3  w-50">
              {/* pasign the things which we made in category formas a props */}
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className='w-75'>
              <table className="table">
                <thead>
                  <tr>

                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button className="btn2 btn-success ms-2 " onClick={() => { setOpen(true); setUpdatedName(c.name); setSelected(c) }}>E d i t</button>
                          {/* passign id in delete fucntion and c._id get krenegn map me se */}
                          <button className="btn2 btn-danger ms-2" onClick={()=>{handleDeleted(c._id)}}>D e l e t e</button>


                        </td>
                      </tr>

                    </>

                  ))}

                </tbody>
              </table>

            </div>
            <Modal onCancel={() => setOpen(false)} footer={null} open={open}>
              <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdated} />
            </Modal>
          </div>
        </div>
      </div>


    </Layout>
  );
}

export default CreateCategory;

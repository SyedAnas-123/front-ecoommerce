//WEAM,DE A CUSTOMHOOOK FOR USE I9N ANY COMPONENTS FIRST WE CALLEDIT IHEADERS PART



import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/Auth";

export default function useCategory() {
    const[auth]=useAuth()
  const [categories, setCategories] = useState([]);

  //GET CATEGORIRES

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
      "https://angry-ring-jay.cyclic.app/api/v1/category/getAll-category",
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
     
      setCategories(data?.category);

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
   
  }, []);

  return categories;
}



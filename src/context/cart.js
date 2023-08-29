//cart ko  ik context banaen gen
// 2: import in index .js THEN USED IR GLOBALLY AND MAKE ITS PAGE AND CRAETE ITS ROUTE
//abh homepage me cart ko edit krengen.
// 4: PRODUCT KO GET KR  KE USKO CART KE AGE EM DISPALY KRWANA HE  or login user k fucntiona;ity bh dikhnii he 


import { useState } from "react";
import { useContext } from "react"; 
import { createContext } from "react";
import { useEffect } from "react";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

//   ******************FOR THIS SEE AUTH.JS CONTEXT****************//


//FOR SAVING DATA IN LOCALSTORAGE AND UI
useEffect(()=>{

 let existingCardItem = localStorage.getItem('cart')
 //checking if cart is avalable already or not and parse existing card itemm ko hi krengen
 if(existingCardItem) setCart(JSON.parse(existingCardItem))
},[])


// *****************************************************************


  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

//custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };

import axios from "axios";
import { useState, createContext, useEffect } from "react";
 

  
import useAxios from "../../Hooks/useAxios";
import useNotify from "../../Hooks/useNotify";
export let CartContext = createContext(0);
export default function CartContextProvider(props) {

  const [numOfCartItems, setNumOfCartItems] = useState(0);
   
  const [numOfWishItems, setNumOfWishItems] = useState(0);
  const [getOfWishItems, getNumOfWishItems] = useState(0);
  const [cartId, setCartId] = useState(null);
  let { ToastContainer, notify } = useNotify();
let headers = { token: localStorage.getItem("userToken") };
async function createCart(id) {
  return await axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      { productId: id },
      {
        headers,
      }
    )
    .then((response) => {
      setNumOfCartItems(response.data.numOfCartItems);
       
      return response;
    })
    .catch((error) => error);
}
async function addWish(productId){
return await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId: productId},{headers})
.then((response)=>   { 
   
  setNumOfWishItems(response?.data.data.length);
  return response;
  
})
.catch((err)=>err);


}
async function getCart() {
  return await axios
    .get(
      `https://ecommerce.routemisr.com/api/v1/cart`,

      {
        headers,
      }
    )
    .then((res) => res)
    .catch((err) => err);
}

async function updateCart(id, count) {
  return await axios
    .put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { count },

      {
        headers,
      }
    )
    .then((res) => res)
    .catch((err) => err);
}

function removeItem(id) {
  return axios
    .delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,

      {
        headers,
      }
    )
    .then((res) => res)
    .catch((err) => err);
}

function clearCar() {
  return axios
    .delete(
      `https://ecommerce.routemisr.com/api/v1/cart`,

      {
        headers,
      }
    )
    .then((response) => {
     
      if (response.data.status === "success") {
         setNumOfCartItems(response.data.numOfCartItems);
      } else {
         
      }
      return response;
    })
    .catch((err) => err);
}


 
async function generateOnlinePayment(id, shippingAddress) {
  return await axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=https://ecommerce-eta-sand.vercel.app/`,
      
      { shippingAddress },
      {
        headers,
      }
    )
    .then((res) => res)
    .catch((err) => err);
}
async function getList() {
  return await axios
  .get(
    `https://ecommerce.routemisr.com/api/v1/wishlist`,
    {
      headers,
    }
  ).then((res) =>{ setNumOfWishItems(res?.data.count);
    
    return res; })
  .catch((err) => err);
  
}
async function removeWish(id) {
  return await axios
    .delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      
      {
        headers,
      }
    )
    .then((res) => {
      setNumOfCartItems(res.data.numOfCartItems);
      
      
    })
    .catch((err) => err);
}

  

 
   
  
      
    

    async function getIntialCart() {
      let { data } = await getCart();
      if (data.status == "success") {
        setNumOfCartItems(data.numOfCartItems);
        setCartId(data.data._id);
        console.log(data.data._id);
      }else{ setNumOfCartItems(0);
        setCartId(0);}
    }
  
    useEffect(() => {
      getIntialCart();
      
    }, []);
  return (
    <CartContext.Provider
      value={{
        numOfCartItems,
        setNumOfCartItems,
        cartId,
        createCart,
        getCart,
        updateCart,
        removeItem,
        clearCar,
      
        generateOnlinePayment,
        addWish,
        getList,
        removeWish,
        numOfWishItems, setNumOfWishItems,
        getOfWishItems, getNumOfWishItems
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

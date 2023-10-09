import { createBrowserRouter, Navigate, RouterProvider, useNavigate } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./components/Home/Home.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Products from "./components/Products/Products.jsx";
import Brands from "./components/Brands/Brands.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Rrgister/Rrgister.jsx";
import Forgotpassword from "./components/Forgotpassword/Forgotpassword.jsx";
import Resetpassword from "./components/Resetpassword/Resetpassword.jsx";
import Updatepassword from "./components/Updatepassword/Updatepassword.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import BrandsLayout from "./components/BrandsLayout/BrandsLayout.jsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import BrandDetails from "./components/BrandDetails/BrandDetails.jsx";
import Wishlist from "./components/Wishlist/Wishlist.jsx";
import EditProfileDataLayout from "./components/EditProfileDataLayout/EditProfileDataLayout.jsx";
import EditProfileDataShipments from "./components/EditProfileDataShipments/EditProfileDataShipments.jsx";
import EditProfileDataPassword from "./components/EditProfileDataPassword/EditProfileDataPassword.jsx"
  
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import CartContextProvider from "./components/CartContext/CartContext.jsx";
import Checkout from "./components/Cart/CheckOut.jsx";
import Allorders from "./components/AllOrders/AllOrders.jsx";
import Categories from "./components/Categories/Categories.jsx";

 
function App() {
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    if(localStorage.getItem("userToken") !== null){
      saveUserData()
    }
  }, []);
  
  function IsUserNotLogin(props){
    if(localStorage.getItem("userToken") === null){
      return <Navigate to={"/login"}/>
    }else{
      return props.children
    }
  }
  
  function IsUserLogin(props){
    if(localStorage.getItem("userToken") !== null){
      // console.log("/")
      return <Navigate to={"/"}/>
    }else{
      // console.log("not /")

      return props.children
    }
  }
  
  function IsVerify(props){
    if(localStorage.getItem("userVerify")){
      return props.children
    }else{
      return <Navigate to={"/"}/>
    }
  }

  function saveUserData() {
    let encodedToken = localStorage.getItem("userToken");
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  }

  let routes = createBrowserRouter([
    {
      path: "",
      element: <Layout setUserData={setUserData} userData={userData}/>,
      children: [
        { index: true, element: <IsUserNotLogin> <Home /></IsUserNotLogin>  },
        { path: "cart", element: <IsUserNotLogin><Cart /></IsUserNotLogin> },
        { path: "Products", element: <IsUserNotLogin><Products /></IsUserNotLogin>},
        { path: "Categories", element: <IsUserNotLogin><Categories /></IsUserNotLogin>},
        { path: "productDetails/:id", element: <ProductDetails  userData={userData}/> },
        { path: "wishlist", element: <IsUserNotLogin><Wishlist /></IsUserNotLogin> },
        { path: "checkout", element: <IsUserNotLogin><Checkout/></IsUserNotLogin> },
        { path: "allorders", element: <IsUserNotLogin><Allorders/></IsUserNotLogin> },
        { path: "EditProfileDataShipments", element: <IsUserNotLogin><EditProfileDataShipments setUserData={setUserData} userData={userData}/></IsUserNotLogin> },
        { path: "editData",
         element: <IsUserNotLogin><EditProfileDataLayout  setUserData={setUserData} userData={userData}/></IsUserNotLogin>,
          children: [
            { path: "EditProfileDataShipments", element: <IsUserNotLogin><EditProfileDataShipments setUserData={setUserData} userData={userData}/></IsUserNotLogin> },
            { path: "updatePassword", element: <IsUserNotLogin><EditProfileDataPassword setUserData={setUserData} userData={userData}/></IsUserNotLogin> },
            // { path: "updateProfile", element: <IsUserNotLogin><EditProfileDataShipments setUserData={setUserData} userData={userData}/></IsUserNotLogin> },
            // { path: "removeProfile", element: <IsUserNotLogin><EditProfileDataShipments setUserData={setUserData} userData={userData}/></IsUserNotLogin> },
          ], 
        },



         
        {
          path: "brands",
          element: <IsUserNotLogin><BrandsLayout /></IsUserNotLogin>,
          children: [
            { path: "", element: <IsUserNotLogin><Brands /></IsUserNotLogin> },
            { path: "brandDetails/:id", element: <IsUserNotLogin><BrandDetails /></IsUserNotLogin>},
          ],
        },
        { path: "login", element: <IsUserLogin><Login saveUserData={saveUserData}/></IsUserLogin> },
        { path: "register", element: <IsUserLogin><Register /></IsUserLogin>},
        { path: "forgot", element: <IsUserLogin><Forgotpassword /></IsUserLogin> },
        { path: "reset", element: <IsUserLogin><Resetpassword/></IsUserLogin>},
        { path: "update", element: <IsVerify><Updatepassword /></IsVerify> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return <CartContextProvider><RouterProvider router={routes}></RouterProvider></CartContextProvider>;
}

export default App;

import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import Loader from "../Loader/Loader";
import style from "./FeaturedProducts.module.css";
import useNotify from "../../Hooks/useNotify";
import { toast } from "react-toastify";
import { CartContext } from "../CartContext/CartContext";

export default function FeaturedProducts(props) {
   
  let { ToastContainer, notify } = useNotify();
let {createCart, addWish,setNumOfWishItems,setNumOfCartItems,numOfWishItems} = useContext(CartContext);
  let navigate = useNavigate();
  async function addWishs(id) {
    let response = await addWish(id);
    if (response.data.status === "success")   {
       setNumOfWishItems(response?.data.data.length);
      
        notify("product has been added to wishlist") 
      
    } else {
      notify("error in adding the product to your wishlist" )}
  }
  function sendToWishlist(i) {
    if (localStorage.getItem("userToken") === null) {
      navigate("/login");
    } else {
      addToWishlist(i);
    }
  }
  async function generateCart(id) {
    let response = await createCart(id);
    if (response.data.status == "success") {
      notify("product has been added to cart");
      setNumOfCartItems(response.data.numOfCartItems);
    } else {
       
    }
  }
  let { data, isLoading } = useAxios(
    "https://ecommerce.routemisr.com/api/v1/products"
  );

  function addToWishlist(i) {
    toast.promise(
      axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId: data.data[i].id },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      ),
      {
        pending: "Wait for add product to your Wishlist",
        success: "product has been added to wishlist",
        error: "Something went wrong. Try again",
      }
    );
  }

  return (
    <>
      <ToastContainer position="bottom-left" theme="dark" />
      <h2>{props.sectionTitle} </h2>
      <div className="container-fluid">
        <div className="row g-3 py-3">
          {isLoading ? <Loader /> : ""}
          {data?.data?.map((el, i) => (
            <div
              key={i}
              className={`col-sm-6 col-lg-4 col-xl-3 col-xxl-2 ${style.allCard}`}
            >
              <div className={`${style.card}`}>
                <div
                  onClick={() => {
                    addWishs(el.id);
                  }}
                  className={`${style.wishlist}`}
                >
                  <i className="fa-regular fa-heart fa-2x"></i>
                </div>
                <Link to={`/productDetails/${el._id}`}>
                  <img className="img-fluid" src={el.imageCover} alt=""></img>
                  <p className={`${style.categoryName} m-0`}>
                    {el.category.name}
                  </p>
                  <h3 className="h5 fw-bold text-capitalize mb-3">
                    {el.brand.name} {el.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="d-flex justify-content-between">
                    <h4 className="h6 fw-bold">{el.price} EGP</h4>
                    <h4 className="h6 fw-bold">
                      <i className={`starIcon fa-solid fa-star`}></i>{" "}
                      {el.ratingsAverage}
                    </h4>
                  </div>
                  
                </Link>
                <button
                  onClick={() => generateCart(el?._id)}
                  className=" main-btn w-100 "
                >
                  + Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

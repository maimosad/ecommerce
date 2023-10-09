import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import useNotify from "../../Hooks/useNotify";
import Loader from "../Loader/Loader";
import style from "./Wishlist.module.css";
import MainBtn from "../MainBtn/MainBtn";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { CartContext } from "../CartContext/CartContext";
 
export default function Cart() {
  let { ToastContainer, notify } = useNotify();
  let { createCart, setNumOfCartItems ,setNumOfWishItems} = useContext(CartContext);
  let { data, isLoading, setError, setData } = useAxios(
    `https://ecommerce.routemisr.com/api/v1/Wishlist`,
    localStorage.getItem("userToken")
  );
  async function generateCart(id) {
    let response = await createCart(id);
    if (response.data.status == "success") {
      
      
       removeItem(id);
    } else {
       
    }
  }
  function callApi() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/Wishlist`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
      //  setNumOfCartItems(res.data.numOfCartItems);
        setData(res.data);
        setNumOfWishItems(res?.data.count)  
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [btnislaoding, setBtnislaoding] = useState(false);

  function sendToCart(id) {
    setBtnislaoding(true);
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId: id },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      )
      .then((res) => {
        removeItem(id);
        notify("product has been added to cart");
        setNumOfCartItems(res.data.numOfCartItems);

      })
      .catch((err) => {
        setBtnislaoding(false);
        setError(err);
      });
  }

  function removeItem(id) {
    setBtnislaoding(true);
    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/Wishlist/${id}`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        
        callApi();
        
        setBtnislaoding(false);
      })
      .catch((err) => {
        setError(err);
        setBtnislaoding(false);
      });
  }

  function checkRemoveItem(id){
    Swal.fire({
      title: "Are you sure, you want to remove this item ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#0aad0a",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeItem(id)
        notify("product has been deleted");
      }
    });
  }

  return (
    <>
      <ToastContainer />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {data.data.length === 0 ? (
            <h2>No Items in Wishlist</h2>
          ) : (
            <div className="container-fluid">
              <div className="row g-3 py-3">
                {data.data.map((el, i) => (
                  <div key={i} className="col-sm-6 col-md-4 col-lg-3 col-xl-2">
                    <div className={`${style.card}`}>
                      <img
                        className="img-fluid"
                        src={el.imageCover}
                        alt=""
                      ></img>
                      <p className={`${style.categoryName} m-0`}>
                        {el.category.name}
                      </p>
                      <Link to={`/productDetails/${el.id}`}>
                        <h3 className="h5 fw-bold text-capitalize mb-3 cursor-pointer">
                          {el.title.split(" ").slice(0, 2).join(" ")}
                        </h3>
                      </Link>
                      <div className="d-flex justify-content-between">
                        <h4 className="h6 fw-bold">{el.price} EGP</h4>
                        <h4 className="h6 fw-bold">
                          <i className={`starIcon fa-solid fa-star`}></i>
                          {el.ratingsAverage}
                        </h4>
                      </div>

                      {btnislaoding ? (
                        <MainBtn
                          theam={"main-btn"}
                          icon={"fa-solid fa-spinner fa-spin-pulse"}
                          width={"w-100"}
                          text={"loading"}
                        />
                      ) : (
                         
                        <button
                        onClick={() => sendToCart(el._id) }
                        className="  main-btn w-100"
                      >
                        <i className="fa-solid fa-cart-plus   "></i> Add
                      </button>
                      )}

                      {btnislaoding ? (
                        <MainBtn
                          theam={"delete-btn my-1"}
                          icon={"fa-solid fa-spinner fa-spin-pulse"}
                          width={"w-100"}
                          text={"loading"}
                        />
                      ) : (
                        <MainBtn
                          functions={() => {
                            checkRemoveItem(el.id);
                          }}
                          theam={"delete-btn my-1"}
                          icon={"fa-regular fa-trash-can"}
                          width={"w-100"}
                          text={"Remove Item"}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

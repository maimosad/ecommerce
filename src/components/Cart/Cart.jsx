import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import useNotify from "../../Hooks/useNotify";
import Loader from "../Loader/Loader";
import style from "./Cart.module.css";
import Swal from "sweetalert2";
import MainBtn from "../MainBtn/MainBtn";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
// import Example from "./Modalx/Modalx";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CartContext } from "../CartContext/CartContext";
 
export default function Cart() {
  let { ToastContainer, notify } = useNotify();
  let { cartId, generateOnlinePayment,clearCar,setNumOfCartItems } = useContext(CartContext);
  const [cartItems, setCartItems] = useState(null);
 
  let [delIsLoading, setdelislaoding] = useState(false);
  const [islaoding, setIslaoding] = useState(false);
  const [modelError, setModelError] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let { data, isLoading, setData, error, setError } = useAxios(
    `https://ecommerce.routemisr.com/api/v1/cart`,
    localStorage.getItem("userToken")
  );

  let [userId, setUserId] = useState(null);

  const [btnislaoding, setBtnislaoding] = useState(false);
  // const [haveData, setHaveData] = useState(false);
  async function handlePayment(values) {
    let { data } = await generateOnlinePayment(cartId, values);
    if (data.session) {
      window.location.href = data.session.url;
    }
  }
  function increaceCount(productId, productCount) {
    setBtnislaoding(true);
    axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: `${(productCount += 1)}`,
        },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      )
      .then((res) => {
        setBtnislaoding(false);
        setData(res.data);
      });
  }

  function decreaceCount(productId, productCount) {
    if (productCount > 1) {
      setBtnislaoding(true);
      axios
        .put(
          `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
          {
            count: `${
              productCount > 1
                ? (productCount -= 1)
                : (productCount = productCount)
            }`,
          },
          {
            headers: {
              token: localStorage.getItem("userToken"),
            },
          }
        )
        .then((res) => {
          setBtnislaoding(false);
          setData(res.data);
        });
    } else {
      Swal.fire({
        title: "Are you sure, you want to remove this item ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#0aad0a",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          setdelislaoding(true);
          setBtnislaoding(true);
          axios
            .delete(
              `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
              {
                headers: {
                  token: localStorage.getItem("userToken"),
                },
              }
            )
            .then((res) => {
              // console.log(res.data)
              setData(res.data);
              setBtnislaoding(false);
              setdelislaoding(false);
              notify("Product have been removed");
              console.log(data.data.products.length)
              if(data.data.products.length === 1){
                setError(!null);
              }
            });
        } else {
          setBtnislaoding(false);
          setdelislaoding(false);
        }
      });
    }
  }
 
  function clearCart(){
    axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    })
    .then((res) => {
      notify("All products have been removed");
      setError(!null);
      setdelislaoding(false);
      setNumOfCartItems(0);
    })
    .catch((err) => {
      setdelislaoding(false);
      setError(err);
    });
  }
  async function clear () {
    let response = await clearCar();
     
      setNumOfCartItems(response.data.numOfCartItems);
      notify("All products have been removed");
      setdelislaoding(false);
      setCartItems(data);
  }
  function checkClearCart() {
    Swal.fire({
      title: "Are you sure, you want to remove all items ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#0aad0a",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setdelislaoding(true);
        clearCart()
      }
    });
  }

  function removeItem(productId) {
    Swal.fire({
      title: "Are you sure, you want to remove this item ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#0aad0a",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setBtnislaoding(true);
        setdelislaoding(true);
        axios
          .delete(
            `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
              headers: {
                token: localStorage.getItem("userToken"),
              },
            }
          )
          .then((res) => {
            notify("Product have been removed");
            setBtnislaoding(false);
            setdelislaoding(false);
            setData(res.data);
            setNumOfCartItems(res.data.numOfCartItems);
          })
          .catch((err) => {
            setError(err);
            setBtnislaoding(false);
            setdelislaoding(false);
          });
      } else {
        setBtnislaoding(false);
        setdelislaoding(false);
      }
    });
  }

  let myValidation = Yup.object({
    details: Yup.string()
      .required("Your Details is Required")
      .min(5, "Min Length is 5 Chars")
      .max(50, "Max Length is 50 Chars"),
    phone: Yup.string()
      .required("Phone Nunber is Required")
      .matches(/^01[0125][0-9]{8}$/, "Your Phone Number inValid"),
    city: Yup.string()
      .required("Your City is Required")
      .min(5, "Min Length is 5 Chars")
      .max(15, "Max Length is 15 Chars"),
  });

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema:myValidation,
    onSubmit: (values)=> handlePayment(values),
  });

  function sendDataToapi(datax) {
    setUserId(data.data._id);
    if (datax !== undefined) {
      console.log(datax);
      setIslaoding(true);
      axios
        .post(
          `https://ecommerce.routemisr.com/api/v1/orders/${userId}`,
          { shippingAddress: datax },
          {
            headers: {
              token: localStorage.getItem("userToken"),
            },
          }
        )
        .then((res) => {
          console.log(res);
          setIslaoding(false);
          clearCart()
          notify("Products have been purchased successfully");
        })
        .catch((error) => {
          setModelError(error);
          setIslaoding(false);
          notify("Product purchase failed, please try again");
        });
    }
  }

  return (
    <>
      <ToastContainer />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {error !== null ? (
            <h2>No Items in Cart</h2>
          ) : (
            <>
              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Enter Shipping Address</Modal.Title>
                </Modal.Header>
                <form onSubmit={formik.handleSubmit} className="form">
                  <Modal.Body>
                    <div className="mb-2">
                      <label
                        htmlFor="InputInput2"
                        className="form-label fw-bolder"
                      >
                        Details :
                      </label>
                      <input
                        id="details"
                        name="details"
                        onChange={formik.handleChange}
                        value={formik.values.details}
                        type="text"
                        className="form-control input"
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.details && formik.touched.details ? (
                        <div className="alert">{formik.errors.details}</div>
                      ) : null}
                    </div>

                    <div className="mb-2">
                      <label
                        htmlFor="InputInput5"
                        className="form-label fw-bolder"
                      >
                        Phone :
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        type="tel"
                        className="form-control input"
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.phone && formik.touched.phone ? (
                        <div className="alert">{formik.errors.phone}</div>
                      ) : null}
                    </div>

                    <div className="mb-2">
                      <label
                        htmlFor="InputInput5"
                        className="form-label fw-bolder"
                      >
                        City :
                      </label>
                      <input
                        id="city"
                        name="city"
                        onChange={formik.handleChange}
                        value={formik.values.city}
                        type="text"
                        className="form-control input"
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.city && formik.touched.city ? (
                        <div className="alert">{formik.errors.city}</div>
                      ) : null}
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <MainBtn
                      functions={() => {
                        handleClose();
                      }}
                      theam={"delete-btn"}
                      text={"Cancel"}
                    />

                    {islaoding ? (
                      <MainBtn
                        theam={"main-btn"}
                        icon={"fa-solid fa-spinner fa-spin-pulse"}
                        text={"loading"}
                      />
                    ) : (
                      <MainBtn
                        functions={() => {
                          sendDataToapi();
                        }}
                        theam={"main-btn"}
                        text={"Order Now"}
                        type={"submit"}
                      />
                    )}
                  </Modal.Footer>
                </form>
              </Modal>

              <div className="d-flex justify-content-between align-items-center flex-wrap my-3">
                <h2 className="h2 py-2 fw-bold m-0">
                  Total Cart Price : {data.data.totalCartPrice} EGP
                </h2>
              
                <div>
                  {delIsLoading ? (
                    <MainBtn
                      theam={"delete-btn me-2"}
                      icon={"fa-solid fa-spinner fa-spin-pulse"}
                      text={"Please Wait"}
                    />
                  ) : (
                    <button
                   
                  onClick={() => checkClearCart()}
                  className="btn text-bg-danger mx-4 rounded-pill"
                >
                  <i className="fa-solid fa-x"></i> Clear
                </button>
                    
                  )}
                  <MainBtn
                    theam={"dark-btn"}
                    functions={handleShow}
                    text={"Order Now"}
                    icon={"fa-solid fa-money-bill-wave"}
                  />
               
                </div>
              </div>
              <div className="row g-3 pb-3">
                {data.data.products.map((el, i) => (
                  <div key={i} className="col-sm-6 col-md-4 col-lg-3 col-xl-2">
                    <div className={`${style.card}`}>
                      <img
                        className="img-fluid"
                        src={`${el.product.imageCover}`}
                        alt={el.product.title}
                      />
                      <Link to={`/productDetails/${el.product.id}`}>
                        <h3 className="h5 fw-bold text-capitalize mb-3 cursor-pointer">
                          {el.product.title.split(" ").slice(0, 2).join(" ")}
                        </h3>
                      </Link>
                      <p className="fs-6 fw-bold main-color">
                        Each {el.price}
                        EGP
                      </p>
                      <h4 className="h5 fw-bold">
                        Total {el.count * el.price} EGP
                      </h4>
                      <div className="d-flex justify-content-between align-items-center py-2">
                        {btnislaoding ? (
                          <MainBtn
                            theam={"dark-btn"}
                            icon={"fa-solid fa-spinner fa-spin-pulse"}
                          />
                        ) : (
                          <MainBtn
                            theam={"dark-btn"}
                            functions={() => {
                              decreaceCount(el.product.id, el.count);
                            }}
                            icon={"fa-solid fa-minus"}
                          />
                        )}

                        <h4 className="h6 fw-bold">Quantity {el.count}</h4>
                        {btnislaoding ? (
                          <MainBtn
                            theam={"dark-btn"}
                            icon={"fa-solid fa-spinner fa-spin-pulse"}
                          />
                        ) : (
                          <MainBtn
                            theam={"dark-btn"}
                            functions={() => {
                              increaceCount(el.product.id, el.count);
                            }}
                            icon={"fa-solid fa-plus"}
                          />
                        )}
                      </div>

                      {btnislaoding ? (
                        <MainBtn
                          theam={"delete-btn"}
                          icon={"fa-solid fa-spinner fa-spin-pulse"}
                        />
                      ) : (
                        <MainBtn
                          theam={"delete-btn"}
                          functions={() => {
                            removeItem(el.product.id);
                          }}
                          icon={"fa-solid fa-trash-can"}
                          text={"Remove Item"}
                          width={"w-100"}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../img/freshcart-logo.svg";
import style from "./Navbar.module.css";
import { CartContext } from "../CartContext/CartContext";
 
export default function Navbar({ userData, setUserData }) {
  let navigate = useNavigate();
let {numOfCartItems,numOfWishItems,getOfWishItems,getList,getNumOfWishItems }= useContext(CartContext);
  function logout() {
    localStorage.removeItem("userToken");
    navigate("/login");
    setUserData(null);
    // console.log(userData)
  }
  async function getLists() {
    let res = await getList();
    if (res.data.status === "success")   {
       getNumOfWishItems(res?.data.count);
      
        
       console.log(res?.data.count);
       
    }  
  }
  useEffect(() => {
    getLists();
  }, []); 
  return (
    <>
    <header>
      <nav className="navbar navbar-expand-lg fixed-top ">
        <div className="container-sm">
          <Link className="navbar-brand" to="/">
            <img className="img-fluid" src={logo} alt="E-commerce" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userData !== null ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    className={`${style.navLink} nav-link`}
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={`${style.navLink} nav-link`}
                    to="/Products"
                  >
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={`${style.navLink} nav-link`}
                    to="/Categories"
                  >
                    Categories
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={`${style.navLink} nav-link`} to="/brands">
                    Brands
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={`${style.navLink} nav-link`} to="/cart">
  
                  <i class="fa-solid fa-cart-shopping fs-5 text-main position-relative">
                    <span class="position-absolute badge bg-danger">{numOfCartItems}</span>
                    </i>
                  </NavLink>
                </li>
               
                <li className="nav-item ms-3">
                  <NavLink
                    className={`${style.navLink} nav-link`}
                    to="/wishlist"
                  >
                      
                    <i class="fa-solid fa-heart fs-5 text-main position-relative">
                    <span class="position-absolute badge bg-danger">{numOfWishItems}</span>
                    </i>
                  </NavLink>
                </li>
                <li className="nav-item ms-3">
                  <NavLink
                    className={`${style.navLink} nav-link`}
                    to="/EditProfileDataShipments"
                  >
                      
                     
                    <i class="fa-solid fa-truck-fast text-main position-relative"> <span class="position-absolute badge bg-danger">orders</span></i>
                  </NavLink>
                </li>
              </ul>
            ) : null}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item d-flex align-items-center">
                <i
                  className={`${style.svg} fa-brands fa-instagram fa-fw me-2`}
                ></i>
                <i
                  className={`${style.svg} fa-brands fa-facebook fa-fw me-2`}
                ></i>
                
                <i
                  className={`${style.svg} fa-brands fa-twitter fa-fw me-2`}
                ></i>
                 
                <i
                  className={`${style.svg} fa-brands fa-youtube fa-fw me-2`}
                ></i>
              </li>

              <div className="nav-item dropdown d-md-flex">
                {userData !== null ? (
                  <>
                    <span
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="Dropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa-regular fa-user"></i>
                    </span>
                    <ul className="dropdown-menu" aria-labelledby="Dropdown">
                      <li>
                        <Link
                          to="/editData"
                          className="dropdown-item fw-bold h5"
                        >
                          {userData.name}
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li className="nav-item">
                        <span
                          className={`${style.navLink} dropdown-item cursor-pointer`}
                          aria-current="page"
                          onClick={logout}
                        >
                          Logout
                        </span>
                      </li>
                    </ul>
                  </>
                ) : (
                  <>
                    <li className=" nav-link pe-0 me-2">
                      <Link
                        className={`${style.navLink}`}
                        aria-current="page"
                        to="/login"
                      >
                        Login
                      </Link>
                    </li>
                    <li className=" nav-link">
                      <Link
                        className={`${style.navLink}`}
                        aria-current="page"
                        to="/register"
                      >
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </div>
            </ul>
          </div>
        </div>
      </nav></header>
    </>
  );
}

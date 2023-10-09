import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import axios from "axios";
import useAxios from "../../Hooks/useAxios";
import Loader from "../Loader/Loader";
import style from "./EditProfileDataLayout.module.css";

export default function EditProfileData({ userData, setUserData }) {
  let { data, isLoading, setData, error, setError } = useAxios(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userData?.id}`
  );

  return (
    <>
      <div className="m-0 py-3 row">
        <div className="col-lg-3 mb-3">
          {userData !== null ? (
            <h2 className="text-center">Hi, {userData.name}</h2>
          ) : null}

          <hr />
          <ul className="navbar-nav">
            <NavLink
              
              to="./"
            >
              
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "activeList" : "")}
              to="updatePassword"
            >
              <li className={`${style.navItem} nav-item h5`}>
                Update Password
              </li>
            </NavLink>
            {/* <NavLink
              className={({ isActive }) => (isActive ? "activeList" : "")}
              to="updateProfile"
            >
              <li className={`${style.navItem} nav-item h5`}>Update Profile</li>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "activeList" : "")}
              to="removeProfile"
            >
              <li className={`${style.navItem} nav-item h5`}>Remove Profile</li>
            </NavLink> */}
          </ul>
        </div>
        <div className="col-lg-9">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}

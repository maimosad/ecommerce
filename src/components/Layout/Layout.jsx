import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout({userData,setUserData}) {
  return (
    <>
      <Navbar setUserData={setUserData} userData={userData}/>
      <div className="container mt-5">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

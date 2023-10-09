import React from "react";
import Loader from "../Loader/Loader";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import useAxios from "../../Hooks/useAxios";
import style from "./EditProfileDataShipments.module.css";

export default function EditProfileDataShipments({ userData, setUserData }) {
  let { data, isLoading, setData, error, setError } = useAxios(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userData?.id}`
  );
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="row mt-3">
          <h2>Your Shipments Details :</h2>
          <hr />
          
           <table className="table table-striped table-hover">
      <thead>
        <tr>
       
          <th>#</th>
          <th>image</th>
          <th>Customer</th>
          <th>Location</th>
          <th>Order Date</th>						
          <th>Status</th>						
          <th>Net Amount</th>
           
        </tr>
      </thead>
      <tbody>
      {data.map((el, i) => (
         
          <tr key={i} >
             <td>{el.id}</td> 
             <td key={i} className=" w-25">
            {el.cartItems.map((el, i) => ( <><img
                        className="img-fluid w-25"
                        src={el.product.imageCover}
                        alt=""
                      ></img><h4 className="h5 fw-bold text-capitalize mb-3">
                      {el.product.title.split(" ").slice(0, 2).join(" ")}{" "}
                    </h4><h6> {el.price}EGP</h6> </>))}{" "}
                    </td>
         
          <td>   {el.user.name} </td>
          <td>  {el.shippingAddress.details} / {el.shippingAddress.city}  </td>
          <td> {el.createdAt.split("").slice(0, 10)} </td>                        
          <td><span className="status text-success">•</span> {el.paymentMethodType}</td>
          <td> {el.totalOrderPrice}</td>
          
        </tr>
            ))}{" "}
         
      </tbody>
    </table>
        </div>
      )}
    </>
  );
}

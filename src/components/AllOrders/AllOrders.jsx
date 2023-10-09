import React, { useEffect, useState } from "react";
 
import axios from "axios";
import jwtDecode from "jwt-decode";
 import { useContext } from "react";
import { CartContext } from "../CartContext/CartContext";
  
export default function Allorders({ userData }) {
  const [mainLoader, setMainLoader] = useState(false);
  const [allOrders, setAllOrders] = useState([]);
 const [userId,setUserId]=useState(null);
   

    useEffect(() => {
       
    const res=  jwtDecode(localStorage.getItem('userToken'))
      
     getOrders(res.id);
   }, []);
   async function getOrders(id) {
     
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`  
      
    ).then((res) => res)
    .catch((err) => err) ;
     setAllOrders(data);
    console.log(data);
    
   };
  return (
    <>
       
     <div className="container">
  <div className="table-wrapper">
    <div className="table-title">
      <div className="row">
        <div className="col-sm-4">
          <h2>Order <b>Details</b></h2>
        </div>
         
      </div>
    </div>
     
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>Customer</th>
          <th>Location</th>
          <th>Order Date</th>						
          <th>Status</th>						
          <th>Net Amount</th>
           
        </tr>
      </thead>
      <tbody>
      {allOrders.map(function(order,index){ 
         return <>
          <tr>
          <td>{order.id}</td> 
          <td>   {order.user.name} </td>
          <td> {order.shippingAddress.city}  </td>
          <td> {order.createdAt} </td>                        
          <td><span className="status text-success">•</span> {order.paymentMethodType}</td>
          <td> {order.totalOrderPrice}</td>
          
        </tr>
        </>   } )}
         
      </tbody>
    </table>
    <div className="clearfix">
      
      
    </div>
  </div>
</div>
  
    </>
  );
}

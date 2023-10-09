import React from "react";
import { Link, useParams } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import Loader from "../Loader/Loader";
import MainBtn from "../MainBtn/MainBtn";
import style from "./BrandDetails.module.css";

export default function BrandDetails() {
  let prams = useParams();
  let { data, isLoading } = useAxios(
    `https://ecommerce.routemisr.com/api/v1/brands/${prams.id}`
  );

  return (
    <>
      <div className="container-fluid">
        <div className="row g-3 py-3">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="col-md-6 text-center">
                <img className="img-fluid" src={data?.data?.image} alt=""></img>
              </div>
              <div className="col-md-6 d-flex justify-content-center align-items-center">
                <div className={`${style.card}`}>
                  <h2 className="h5 fw-bold text-capitalize mb-2">
                    Brand Name : {data?.data?.name}
                  </h2>
                  <p className="mb-2">
                    Created At : {data?.data?.createdAt.split("").slice(0, 10)}
                  </p>
                  <p>
                    Updated At : {data?.data?.updatedAt.split("").slice(0, 10)}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

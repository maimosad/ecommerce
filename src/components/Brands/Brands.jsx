import { Link, Outlet } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import Loader from "../Loader/Loader";
import style from "./Brands.module.css";

export default function Brands() {
  let { data, isLoading } = useAxios(
    "https://ecommerce.routemisr.com/api/v1/brands"
  );

  return (
    <>
      <div className="container-fluid">
        <div className="row g-3 py-3">
          {isLoading ? <Loader /> : ""}
          {data?.data?.map((el, i) => (
            <div key={i} className="col-sm-6 col-lg-4 col-xl-3 col-xxl-2">
              <Link to={`brandDetails/${el._id}`}>
                <div className={`${style.card}`}>
                  <img className="img-fluid" src={el.image} alt=""></img>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

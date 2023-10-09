import { Link, Outlet } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import Loader from "../Loader/Loader";
import style from "./Categories.module.css";
 
export default function Categories() {
  let { data, isLoading } = useAxios(
    "https://ecommerce.routemisr.com/api/v1/categories"
  );

  return (
    <>
      <div className="container-fluid py-5">
          <div className="row">
          {isLoading ? <Loader /> : ""}
            {data?.data?.map((el, i)  => (
              <div key={i} className="col-md-3">
                <Link>
                  <img
                    src={el.image}
                    className="w-100"
                    height={400}
                    alt=""
                  />
                  <h5 className="text-main text-center">{el.name}</h5>
                </Link>
              </div>
            ))}
          </div>
        </div>
    </>
  );
}

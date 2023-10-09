import axios from "axios";
import React, { useEffect, useState } from "react";

export default function useAxios(url, headersToken) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  function callApi() {
    axios
      .get(url, {
        headers: {
          token: headersToken,
        },
      })
      .then((res) => {
        // callApi()
        setIsLoading(false);
        setData(res.data);
        // console.log(res.data)
      })
      .catch((err) => {
        // console.log(err)
        setError(err);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    callApi();
  }, []);

  // useEffect(() => {
  //   callApi();
  // }, [data]);

  return {
    data,
    setData,
    isLoading,
    setIsLoading,
    error,
    setError,
  };
}

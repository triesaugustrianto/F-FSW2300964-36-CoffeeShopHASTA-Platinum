import React from "react";
import { useNavigate, useParams } from "react-router";
import { Errors, FormProduct, Loading } from "../../../components";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import useSWR from "swr";
import { fetcher } from "../../../fetch";
export const EditProductCms = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  //get data
  const { isLoading, error, data } = useSWR(
    `http://localhost:2000/api/product/${id}`,
    fetcher
  );
  if (isLoading) return <Loading />;
  if (error) return <Errors />;

  const Submits = (data) => {
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("active", data.active);
    formData.append("image", data.image[0]);

    let product = {};
    formData.forEach(function (value, key) {
      product[key] = value;
    });

    axios
      .put(`http://localhost:2000/api/product/${id}`, product, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Acess-Control-Allow-Origin": "*",
          Accept: "application/json",
        },
      })
      .then((res) => {
        if (res.status === 201) {
          toast.success("Success update product !", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1200,
          });
          setTimeout(() => {
            window.location.href = "/adm/produk";
          }, 1500);
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          toast.error("Error Notification !", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  };

  return (
    <div className="container-fluid">
      <ToastContainer />
      {data &&
        data.map((e) => {
          return (
            <FormProduct
              key={e.id}
              title="Edit product"
              dfname={e.name}
              dfprice={e.price}
              dfcategory={e.category}
              dfdesc={e.description}
              Submits={Submits}
              dfimg={false}
              back={() => navigate(-1)}
            />
          );
        })}
    </div>
  );
};

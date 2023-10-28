import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { BreadCum, FormProduct } from "../../../components";
import { useNavigate } from "react-router";

//modul
export const CreateProductCms = () => {
  const navigate = useNavigate();
  const Submits = (data) => {
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("image", data.image[0]);
    let product = {};
    formData.forEach(function (value, key) {
      product[key] = value;
    });
    axios
      .post(`http://app-citrapersada.net:2000/api/product`, product, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Acess-Control-Allow-Origin": "*",
          Accept: "application/json",
        },
      })
      .then((res) => {
        if (res.status === 201) {
          toast.success("Success create product !", {
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
      <BreadCum pg1={"Product"} pg2={"create"} />

      <ToastContainer />
      <div className="container my-4">
        <FormProduct
          Submits={Submits}
          back={() => navigate(-1)}
          isUpdate={true}
        />
      </div>
    </div>
  );
};

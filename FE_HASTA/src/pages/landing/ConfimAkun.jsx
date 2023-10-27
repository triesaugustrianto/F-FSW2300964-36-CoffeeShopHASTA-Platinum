import React from "react";
import { confirm } from "../../assets";
import { useParams } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
export const ConfimAkun = () => {
  const { id } = useParams();
  const { handleSubmit } = useForm();
  const Submit = (data) => {
    axios
      .put(`http://localhost:2000/api/users/confirm/${id}`, data)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Success confirm !", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
          setTimeout(() => {
            window.location.href = "/login";
          }, 1800);
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
    <div className="container-fluid " style={{ marginTop: "50vh" }}>
      <ToastContainer />
      <div className="row d-flex justify-content-center">
        <form
          style={{ width: "10rem" }}
          className="d-flex flex-column justify-content-center align-content-center"
          onSubmit={handleSubmit(Submit)}
        >
          <img src={confirm} alt="foto" />
          <button type="submit" className="btn btn-success mt-4">
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

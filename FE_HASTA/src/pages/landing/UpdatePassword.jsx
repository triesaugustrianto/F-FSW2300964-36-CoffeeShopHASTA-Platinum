import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { logo } from "../../assets";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router";
export const UpdatePassword = () => {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(true);
  let password;
  //SCHEMA
  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password harus di isi")
      .min(4, "Panjang kata sandi minimal harus 4 karakter"),

    cpassword: Yup.string()
      .required("Konfirm Password harus di isi")
      .min(4, "Panjang kata sandi minimal harus 4 karakter")
      .oneOf([Yup.ref("password")], "Kata sandi tidak sama"),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onSubmit", resolver: yupResolver(formSchema) });
  password = watch("password", "");
  //send data
  const Submit = (data) => {
    axios
      .put(
        `http://app-citrapersada.net:2000/api/users/update-password/${id}`,
        data
      )
      .then((res) => {
        if (res.status === 201) {
          toast.success("update password success !", {
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
        console.log(err);
      });
  };
  return (
    <div
      className=""
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1516646227334-6102731f3c25?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
      }}
    >
      <ToastContainer />
      <div
        className="card px-5 py-5 position-absolute top-50 start-50 translate-middle shadow"
        style={{ width: "26rem" }}
      >
        <img src={logo} alt="foto" className="img-fluid " />
        <h5 className="text-center my-3">Update Password</h5>
        <form onSubmit={handleSubmit(Submit)}>
          {/* Email input */}
          <div className="col-12">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group flex-nowrap">
              <input
                type={show ? "text" : "password"}
                className="form-control"
                {...register("password", { required: true })}
              />
              <button
                className="input-group-text "
                type="button"
                onClick={() => setShow(!show)}
              >
                {show ? <Eye /> : <EyeSlash />}
              </button>
            </div>
            <span className="text-danger" style={{ fontSize: "13px" }}>
              {errors.password?.message}
            </span>
          </div>
          <div className="col-12 mt-3">
            <label htmlFor="password" className="form-label">
              Confirm Password
            </label>
            <div className="input-group flex-nowrap">
              <input
                {...register("cpassword", {
                  required: true,
                })}
                type={show2 ? "password" : "text"}
                className="form-control"
              />
              <button
                className="input-group-text "
                type="button"
                onClick={() => setShow2(!show2)}
              >
                {show2 ? <Eye /> : <EyeSlash />}
              </button>
            </div>
            <span className="text-danger " style={{ fontSize: "13px" }}>
              {errors.cpassword?.message}
            </span>
          </div>
          {/* Submit button */}
          <button
            type="submit"
            className="btn btn-success btn-block mb-4 w-100  mt-4"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { logo } from "../../assets";
import axios from "axios";
export const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //send data
  const Submit = (data) => {
    axios
      .post(`http://app-citrapersada.net:2000/api/users/reset-password`, data)
      .then((res) => {
        if (res.status === 201) {
          toast.success("reset password success !", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
          setTimeout(() => {
            window.location.href = "https://mail.google.com";
          }, 1800);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast.warning("email tidak terdaftar", {
            position: toast.POSITION.TOP_CENTER,
          });
        }

        if (err.response.status === 500) {
          toast.error("Error Notification !", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  };
  return (
    <div
      className=""
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1598685530037-feb0accd2722?auto=format&fit=crop&q=80&w=1888&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
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
        <img src={logo} alt="foto" className="img-fluid" />
        <h5 className="text-center my-3">Forgot Password</h5>
        <form onSubmit={handleSubmit(Submit)}>
          {/* Email input */}
          <div className="form-outline mb-4">
            <label className="form-label p5" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <div className="text-danger mt-2" style={{ fontSize: "14px" }}>
                <ExclamationCircle /> field required
              </div>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="btn btn-success btn-block mb-4 w-100  mt-4"
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

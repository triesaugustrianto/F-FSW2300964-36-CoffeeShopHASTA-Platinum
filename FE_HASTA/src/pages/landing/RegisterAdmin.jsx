import { useForm } from "react-hook-form";
import { Eye, EyeSlash, ExclamationCircle } from "react-bootstrap-icons";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { logo, regist } from "../../assets";
//modul
function RegisterAdmin() {
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //send data
  const Submit = (data) => {
    axios
      .post(`http://app-citrapersada.net:2000/api/users`, data)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Success Notification !", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
          setTimeout(() => {
            window.location.replace("https://mail.google.com");
          }, 1800);
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          toast.error("Error Notification !", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        if (err.response.status === 400) {
          toast.warning("Warning Notification !", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  };
  return (
    <div className="container-fluid d-flex">
      <ToastContainer />
      <img src={regist} alt="foto" className="img-fluid d-sm-flex d-none" />
      <div className="container py-2">
        <div className="d-flex justify-content-center mb-3">
          <img src={logo} alt="logo" style={{ width: "250px" }} />
        </div>
        <div className="card px-5 py-4 shadow">
          <form className="row g-3 " onSubmit={handleSubmit(Submit)}>
            <div className="col-12">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                {...register("name", { required: true })}
              />{" "}
              {errors.name && (
                <div className="text-danger mt-2" style={{ fontSize: "14px" }}>
                  <ExclamationCircle /> field required
                </div>
              )}
            </div>
            <div className="col-12">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                {...register("email", { required: true })}
              />
              {errors.name && (
                <div className="text-danger mt-2" style={{ fontSize: "14px" }}>
                  <ExclamationCircle /> field required
                </div>
              )}
            </div>
            <div className="col-12">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="number"
                className="form-control"
                id="phone"
                {...register("phone", { required: true })}
              />
              {errors.phone && (
                <div className="text-danger mt-2" style={{ fontSize: "14px" }}>
                  <ExclamationCircle /> field required
                </div>
              )}
            </div>
            <div className="col-12">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <textarea
                className="form-control"
                id="address"
                {...register("address")}
              ></textarea>
            </div>
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
              {errors.password && (
                <div className="text-danger mt-2" style={{ fontSize: "14px" }}>
                  <ExclamationCircle /> field required
                </div>
              )}
            </div>
            <div className="form-check mt-4">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue="admin"
                id="role"
                {...register("role", { required: true })}
                defaultChecked="true"
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Admin
              </label>
            </div>
            {errors.role && (
              <div className="text-danger mt-2" style={{ fontSize: "14px" }}>
                <ExclamationCircle /> field required
              </div>
            )}
            <div className="col-12 mt-4 ">
              <button type="submit" className="btn btn-success w-100">
                Sign Up
              </button>
            </div>
            <div className="d-flex justify-content-end fw-semibold ">
              <Link to={"/login"} className="text-decoration-none text-success">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterAdmin;

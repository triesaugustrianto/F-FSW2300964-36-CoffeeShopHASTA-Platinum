import React from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft, ExclamationCircle } from "react-bootstrap-icons";
export const FormProduct = ({
  title = "Create Product",
  dfname,
  dfprice,
  dfcategory,
  dfdesc,
  back,
  Submits,
  isUpdate,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="card px-5 py-5">
      <span
        className="fw-bold fs-4 text-danger"
        style={{ cursor: "pointer" }}
        onClick={back}
      >
        <ArrowLeft />
      </span>
      <h4 className="mb-4 text-center ">{title}</h4>
      <form className="row g-3" onSubmit={handleSubmit(Submits)}>
        <div className="col-md-6">
          <label htmlFor="nama" className="form-label">
            Name product
          </label>
          <input
            type="text"
            className="form-control"
            id="nama"
            {...register("name", { required: true })}
            defaultValue={dfname}
          />
          {errors.name && (
            <div className="text-danger mt-2" style={{ fontSize: "14px" }}>
              <ExclamationCircle /> field required
            </div>
          )}
        </div>
        <div className="col-md-6">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            {...register("price", { required: true })}
            defaultValue={dfprice}
          />
          {errors.price && (
            <div className="text-danger mt-2" style={{ fontSize: "14px" }}>
              <ExclamationCircle /> field required
            </div>
          )}
        </div>
        <div className="col-12">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            {...register("category", { required: true })}
            defaultValue={dfcategory}
          >
            <option value={"Coffe"}>Coffe</option>
            <option value={"Tea"}>Tea</option>
            <option value={"Blended"}>Blended</option>
            <option value={"Others"}>Others</option>
          </select>
          {errors.category && (
            <div className="text-danger mt-2" style={{ fontSize: "14px" }}>
              <ExclamationCircle /> field required
            </div>
          )}
        </div>
        <div className="col-12">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            {...register("description", { required: true })}
            defaultValue={dfdesc}
          />{" "}
          {errors.description && (
            <div className="text-danger mt-2" style={{ fontSize: "14px" }}>
              <ExclamationCircle /> field required
            </div>
          )}
        </div>
        <div className="col-12">
          <label htmlFor="formFile" className="form-label">
            Image
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            accept="image/png"
            {...register("image", { required: true })}
          />
          {errors.image && (
            <div className="text-danger mt-2" style={{ fontSize: "14px" }}>
              <ExclamationCircle /> field required
            </div>
          )}
        </div>
        {!isUpdate && (
          <>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                defaultValue={true}
                {...register("active")}
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Active
              </label>
            </div>
          </>
        )}
        <div className="col-12">
          <button type="submit" className="btn btn-success w-100 mt-4">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

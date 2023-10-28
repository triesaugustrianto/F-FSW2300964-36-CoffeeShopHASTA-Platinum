import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { BreadCum, Modals } from "../../../components";
import { ToastContainer, toast } from "react-toastify";
import { format } from "../../../fetch/format";
import { ProductConsum, SearchConsum } from "../../../context/GlobalContext";
import { useForm } from "react-hook-form";
import axios from "axios";

export const ProductCms = () => {
  const [search] = useContext(SearchConsum);
  const { handleSubmit } = useForm();
  const [data] = useContext(ProductConsum);
  const navigate = useNavigate();
  const [id, setId] = useState(0);
  const Submits = () => {
    axios
      .delete(`http://app-citrapersada.net:2000/api/product/delete/${id}`)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Success delete product !", {
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
      <BreadCum pg1={"Product"} pg2={"list"} />
      <div className="container d-flex justify-content-end gap-3 mb-4">
        <button
          className="btn  btn-success"
          onClick={() => navigate(`/adm/product/create`)}
        >
          Create Product
        </button>
      </div>
      <div className="container mt-5 d-flex justify-content-center flex-wrap gap-4 mb-5">
        {data &&
          data
            .filter((item) => {
              if (search !== " ") {
                return item.name.toLowerCase().includes(search);
              } else if (search === " ") {
                return item;
              }
            })
            .map((e) => {
              return (
                <div
                  className="card shadow-sm  "
                  style={{ width: "18rem" }}
                  key={e.id}
                >
                  <img
                    src={e.image}
                    className="card-img-top"
                    alt="..."
                    style={{ height: "200px" }}
                  />
                  <div className="card-body ">
                    <h5 className="card-title">{e.name}</h5>
                    <p className="card-text" style={{ fontSize: "13px" }}>
                      {e.description}
                    </p>
                    <p className="card-text">Category : {e.category}</p>
                    <p className="card-text">Price : {format(e.price)}</p>
                    Status :{" "}
                    <span
                      className={
                        e.statusProduct ? "text-success" : " text-danger"
                      }
                    >
                      {e.statusProduct ? "Active" : "Discontinue"}
                    </span>
                  </div>
                  <div className="card-body d-flex justify-content-evenly">
                    <button
                      className="btn btn-sm btn-outline-success px-4"
                      onClick={() => navigate(`/adm/product/edit/${e.id}`)}
                    >
                      Edit
                    </button>
                    {e.statusProduct ? (
                      <button
                        className="btn btn-sm btn-outline-danger px-3"
                        data-bs-toggle="modal"
                        data-bs-target="#del"
                        onClick={() => setId(e.id)}
                      >
                        Delete
                      </button>
                    ) : null}
                  </div>
                </div>
              );
            })}
      </div>
      <Modals
        title={"sure delete the product ?"}
        id={"del"}
        content={
          <form onSubmit={handleSubmit(Submits)}>
            <button className="btn btn-danger w-100">Delete</button>
          </form>
        }
      />
    </div>
  );
};

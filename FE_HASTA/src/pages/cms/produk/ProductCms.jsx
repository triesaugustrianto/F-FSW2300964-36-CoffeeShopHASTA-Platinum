import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { BreadCum, Errors, Loading } from "../../../components";

import { format } from "../../../fetch/format";
import { ProductConsum } from "../../../context/GlobalContext";

export const ProductCms = () => {
  const [data] = useContext(ProductConsum);
  const navigate = useNavigate();

  return (
    <div className="container-fluid">
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
          data.map((e) => {
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
                <div className="card-body d-flex justify-content-center">
                  <button
                    className="btn btn-sm btn-outline-success px-5"
                    onClick={() => navigate(`/adm/product/edit/${e.id}`)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

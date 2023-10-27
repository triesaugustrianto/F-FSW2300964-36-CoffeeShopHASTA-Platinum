import React from "react";
import { succes } from "../assets";
import useSWR from "swr";
import { fetcher } from "../fetch";
import { Loading } from "./Loading";
import { Errors } from "./Errors";

export const NewOrder = () => {
  const { data, isLoading, error } = useSWR(
    `http://localhost:2000/api/transaksi-totalnew`,
    fetcher
  );
  if (isLoading) return <Loading />;
  if (error) return <Errors />;
  return (
    <div className="container">
      <div
        className="card shadow  d-flex flex-column justify-content-center align-items-center position-relative"
        style={{ width: "18rem", height: "16rem" }}
      >
        <span className="bg-success px-2  rounded-pill text-white position-absolute top-0 start-100 translate-middle">
          {data && data.length ? data && data.map((e) => e.count) : 0}
        </span>
        <img
          src={succes}
          className="card-img-top"
          alt="..."
          style={{ width: "150px" }}
        />
        <div className="card-body">
          <h5 className="card-title fw-semibold text-secondary">New Order</h5>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { sales } from "../assets";
import useSWR from "swr";
import { fetcher } from "../fetch";
import { Loading } from "./Loading";
import { Errors } from "./Errors";
import { format } from "../fetch/format";

export const CardSales = () => {
  const { data, isLoading, error } = useSWR(
    `http://app-citrapersada.net:2000/api/transaksi-total`,
    fetcher
  );
  if (isLoading) return <Loading />;
  if (error) return <Errors />;

  return (
    <div className="container">
      <div
        className="card shadow  d-flex flex-column justify-content-between align-items-center position-relative"
        style={{ width: "18rem", height: "16rem" }}
      >
        <span className="bg-success px-2  rounded-pill text-white position-absolute top-0 start-100 translate-middle">
          {data && data.length ? data && data.map((e) => e.count) : 0}
        </span>
        <img
          src={sales}
          className="card-img-top"
          alt="..."
          style={{ width: "120px" }}
        />
        <div className="card-body">
          <h5 className="card-title fw-semibold text-secondary">
            Sales
            <span className="fw-medium mx-2">
              Rp :{" "}
              {data && data.length ? data && data.map((e) => format(e.sum)) : 0}
            </span>
          </h5>
        </div>
      </div>
    </div>
  );
};

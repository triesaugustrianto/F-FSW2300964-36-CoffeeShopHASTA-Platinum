import React from "react";

import useSWR from "swr";
import { fetcher } from "../fetch";
import { Loading } from "./Loading";
import { Errors } from "./Errors";
import { active } from "../assets";

export const CardProductActive = () => {
  const { data, isLoading, error } = useSWR(
    `http://localhost:2000/api/product-count`,
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
        <span
          className="bg-success px-3 text-white position-absolute top-0 end-0 "
          style={{ borderEndStartRadius: "8px", borderTopRightRadius: "5px" }}
        >
          {data && data.length ? data && data.map((e) => e.count) : 0}
        </span>
        <img
          src={active}
          className="card-img-top"
          alt="..."
          style={{ width: "150px" }}
        />
        <div className="card-body">
          <h5 className="card-title fw-semibold text-secondary">
            Product Active
          </h5>
        </div>
      </div>
    </div>
  );
};

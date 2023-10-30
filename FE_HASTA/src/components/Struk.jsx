import React from "react";
import { logo } from "../assets";

export const Struk = ({ no, cs, date, to, cash, cange, show, click }) => {
  return (
    <div className=" mb-3 ">
      <div className="card px-3 py-3">
        <div className="d-flex justify-content-center my-2">
          <img src={logo} alt="foto" style={{ width: "150px" }} />
        </div>
        <div style={{ fontSize: "13px" }}>
          <div>No Order : {no}</div>
          <div>Cashier : {cs}</div>
          <div>Date : {date}</div>
        </div>
        <hr className="text-success " />

        <hr />
        <div
          style={{ fontSize: "13px" }}
          className="d-flex justify-content-between"
        >
          <div className="">
            <div>Totals : {to}</div>
            <div>Cash : {cash}</div>
            <div>Changes : {cange}</div>
          </div>
          <button
            className=" btn btn-sm btn-outline-success "
            data-bs-toggle="modal"
            data-bs-target="#detail"
            onClick={click}
          >
            Detail
          </button>
        </div>
        <h5 className="text-center fw-semibold text-success mt-3">
          Thank you !
        </h5>
      </div>
    </div>
  );
};

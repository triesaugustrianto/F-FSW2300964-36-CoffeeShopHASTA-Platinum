import React from "react";
import { nulls } from "../assets";

export const Nulls = ({ ket = "Opps belum ada orderan baru !!", click }) => {
  return (
    <div className="position-absolute top-50 start-50 translate-middle bg-secondary ">
      <div className="container">
        <div className="d-flex flex-column align-items-center" onClick={click}>
          <img src={nulls} alt="loading" style={{ width: "150px" }} />
          <p className="fw-bold">{ket}</p>
        </div>
      </div>
    </div>
  );
};

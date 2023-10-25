import React from "react";

export const BreadCum = ({ pg1, pg2 }) => {
  return (
    <div className="container-fluid ">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a className="nav-link text-success text-capitalize">{pg1}</a>
          </li>
          <li
            className="breadcrumb-item active text-success text-capitalize"
            aria-current="page"
          >
            {pg2}
          </li>
        </ol>
      </nav>
    </div>
  );
};

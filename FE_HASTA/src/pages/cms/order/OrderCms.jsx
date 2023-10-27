import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";

export const OrderCms = () => {
  const storedValueAsNumber = Number(sessionStorage.getItem("act"));
  //nav link
  const [active, setActive] = useState(
    Number.isInteger(storedValueAsNumber) ? storedValueAsNumber : 1
  );
  useEffect(() => {
    sessionStorage.setItem("act", String(active));
  }, [active]);
  return (
    <div className="container-fluid">
      <div className="container d-flex justify-content-end">
        <ul className="nav ">
          <li className={active === 1 ? "nav-item active" : "nav-item"}>
            <NavLink
              className="nav-link text-success"
              aria-current="page"
              to={"/adm/order"}
              onClick={() => setActive(1)}
            >
              New Order
            </NavLink>
          </li>
          <li className={active === 2 ? "nav-item active" : "nav-item"}>
            <NavLink
              className="nav-link text-success"
              aria-current="page"
              to={"/adm/order/check"}
              onClick={() => setActive(2)}
            >
              Check Order
            </NavLink>
          </li>
          <li className={active === 3 ? "nav-item active" : "nav-item"}>
            <NavLink
              className="nav-link text-success"
              aria-current="page"
              to={"/adm/order/done"}
              onClick={() => setActive(3)}
            >
              Done Order
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="col">
        <Outlet />
      </div>
    </div>
  );
};

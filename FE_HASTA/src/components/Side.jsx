import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Cart,
  Clipboard2Data,
  CupStraw,
  Palette,
  People,
  Person,
} from "react-bootstrap-icons";
import { logo } from "../assets";
export const Side = () => {
  const storedValueAsNumber = Number(sessionStorage.getItem("count"));
  //nav link
  const [active, setActive] = useState(
    Number.isInteger(storedValueAsNumber) ? storedValueAsNumber : 1
  );
  useEffect(() => {
    sessionStorage.setItem("count", String(active));
  }, [active]);

  const date = new Date();
  return (
    <div className="d-flex justify-content-between flex-column  px-3 py-3  w-auto vh-100 border  ">
      <div>
        <Link>
          <img src={logo} alt="logo" style={{ width: "150px" }} />
        </Link>
        <hr className="text-text-secondary text-white fw-bold " />
        <ul className="nav nav-pills d-flex flex-column justify-content-between">
          <li
            className={active === 1 ? "active nav-item mt-3 " : "nav-item mt-3"}
            onClick={(e) => setActive(1)}
          >
            <Link to={"/adm"} className="nav-link text-success">
              <Palette className="me-3" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li
            className={active === 2 ? "active nav-item mt-3 " : "nav-item mt-3"}
            onClick={(e) => setActive(2)}
          >
            <Link to={"/adm/order"} className="nav-link text-success">
              <Cart className="me-3" />
              <span>Order</span>
            </Link>
          </li>
          <li
            className={active === 3 ? "active nav-item mt-3 " : "nav-item mt-3"}
            onClick={(e) => setActive(3)}
          >
            <Link to={"/adm/produk"} className="nav-link text-success">
              <CupStraw className="me-3" />
              <span>Product</span>
            </Link>
          </li>
          <li
            className={active === 4 ? "active nav-item mt-3 " : "nav-item mt-3"}
            onClick={(e) => setActive(4)}
          >
            <Link to={"/adm/user"} className="nav-link text-success">
              <People className="me-3" />
              <span>Customer</span>
            </Link>
          </li>

          <li
            className={active === 5 ? "active nav-item mt-3 " : "nav-item mt-3"}
            onClick={(e) => setActive(5)}
          >
            <Link to={"/adm/report"} className="nav-link text-success">
              <Clipboard2Data className="me-3" />
              <span>Report</span>
            </Link>
          </li>
          <li
            className={active === 6 ? "active nav-item mt-3 " : "nav-item mt-3"}
            onClick={(e) => setActive(6)}
          >
            <Link to={"/adm/profil"} className="nav-link text-success">
              <Person className="me-3" />
              <span>Profil</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

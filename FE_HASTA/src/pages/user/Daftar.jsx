import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CardProduct, Errors, Loading, Modals } from "../../components";
import useSWR from "swr";
import { fetcher } from "../../fetch";

//modul
export const Daftar = () => {
  const [category, setCategory] = useState("all");
  const navigate = useNavigate();
  const { data, isLoading, error } = useSWR(
    `http://app-citrapersada.net:2000/api/product?categories=${category}`,
    fetcher
  );

  if (isLoading) return <Loading />;
  if (error) return <Errors />;

  return (
    <div className="min-vh-100">
      <div className="container mt-2">
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <NavLink
              className={
                category === "all"
                  ? "nav-link text-success fw-bold"
                  : "nav-link "
              }
              aria-current="page"
              onClick={() => setCategory("all")}
            >
              All
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={
                category === "Coffe"
                  ? "nav-link text-success fw-bold"
                  : "nav-link "
              }
              aria-current="page"
              onClick={() => setCategory("Coffe")}
            >
              Coffe
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={
                category === "Tea"
                  ? "nav-link text-success fw-bold"
                  : "nav-link "
              }
              aria-current="page"
              onClick={() => setCategory("Tea")}
            >
              Tea
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={
                category === "Blended"
                  ? "nav-link text-success fw-bold"
                  : "nav-link "
              }
              aria-current="page"
              onClick={() => setCategory("Blended")}
            >
              Blend
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={
                category === "Others"
                  ? "nav-link text-success fw-bold"
                  : "nav-link "
              }
              aria-current="page"
              onClick={() => setCategory("Others")}
            >
              Other
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="container d-flex justify-content-between mt-4 flex-wrap gap-3">
        {data &&
          data.map((e) => {
            return (
              <CardProduct
                key={e.id}
                img={e.image}
                title={e.name}
                cat={e.category}
                price={e.price}
                click={() => navigate(`/user/menu/co/${e.id}`)}
              />
            );
          })}
      </div>
    </div>
  );
};

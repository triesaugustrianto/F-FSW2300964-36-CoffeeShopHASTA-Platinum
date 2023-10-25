import React, { useContext } from "react";
import { SearchConsum } from "../context/GlobalContext";
import { BoxArrowRight } from "react-bootstrap-icons";
import { avatar } from "../assets";
export const NavbarCms = () => {
  const [search, setSearch] = useContext(SearchConsum);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };
  return (
    <nav className="navbar navbar-expand-lg  fixed-top mb-5 border-bottom border-secondary  border-opacity-50 bg-white ">
      <div className="container-fluid">
        <button
          className="navbar-toggler mb-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2  border border-success "
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
            <li className="nav-item  ms-md-4">
              <a className="nav-link " aria-current="page">
                {JSON.parse(sessionStorage.getItem("Name"))}
              </a>
            </li>
            <span>
              <img src={avatar} alt="profil" style={{ width: "28px" }} />
            </span>
            <li className="nav-item  ms-md-3">
              <button className="ms-2 me-4 fs-5 btn" onClick={handleLogout}>
                <BoxArrowRight />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

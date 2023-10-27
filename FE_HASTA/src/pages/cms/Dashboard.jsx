import React from "react";
import { Outlet } from "react-router";

export const Dashboard = () => {
  return (
    <div
      className="container-fluid  "
      style={{ marginTop: "80px", paddingLeft: "180px" }}
    >
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

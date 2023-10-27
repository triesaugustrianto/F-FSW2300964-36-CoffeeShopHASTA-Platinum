import React from "react";
import {
  BreadCum,
  CardSales,
  CradUserActive,
  NewOrder,
} from "../../components";

export const HomeCms = () => {
  return (
    <div className="container-fluid ">
      <BreadCum pg1={"Dashboard"} pg2={"Home"} />
      <div className="container d-flex justify-content-evenly flex-wrap mt-5">
        {/* notif */}
        <div className="">
          <NewOrder />
        </div>

        {/* //SALES */}
        <div className="">
          <CardSales />
        </div>
        <div className="">
          {/* user */}
          <CradUserActive />
        </div>
      </div>
    </div>
  );
};

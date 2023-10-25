import React from "react";
import { useState } from "react";

function OrderTable() {
  const [textColor, setTextColor] = useState("#a3a3a3");
  const [textCheck2, setTextCheck2] = useState("#a3a3a3");

  const handleClick1 = () => {
    if (textColor === "#a3a3a3") {
      setTextColor("#009be7");
    } else {
      setTextColor("#a3a3a3");
    }
  };

  const handleClick2 = () => {
    if (textCheck2 === "#a3a3a3") {
      setTextCheck2("#009be7");
    } else {
      setTextCheck2("#a3a3a3");
    }
  };

  return (
    <div className="container m-5">
      <div className="row">
        <div className="col">
          <table className="table table-bordered table-striped bg-transparent">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Product</th>
                <th scope="col">Quantity</th>
                <th scope="col">Size</th>
                <th scope="col">Sugar</th>
                <th scope="col">Cold/Hot</th>
                <th scope="col">Topping</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* {data.map((data) => ( */}
              <tr>
                <td>1</td>
                <td>John Doe</td>
                <td>Kopi Saset</td>
                <td>2</td>
                <td>Large</td>
                <td>Less Sugar</td>
                <td>Cold</td>
                <td>Boba</td>
                <td>
                  <button
                    href="#"
                    className="border-0 bg-transparent"
                    title="Waiting"
                    onClick={handleClick1}
                    style={{ color: textColor }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      className="bi bi-check fill-current bg-transparent"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                    </svg>
                  </button>
                  <button
                    href="#"
                    className="border-0 bg-transparent"
                    title="Done"
                    onClick={handleClick2}
                    style={{ color: textCheck2 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      className="bi bi-check-all fill-current bg-transparent"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z" />
                    </svg>
                  </button>
                </td>
              </tr>
              {/* ))} */}
            </tbody>
          </table>{" "}
        </div>
      </div>
    </div>
  );
}

export default OrderTable;

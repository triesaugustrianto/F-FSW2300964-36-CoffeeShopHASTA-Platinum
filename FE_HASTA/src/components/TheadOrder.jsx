import React from "react";

export const TheadOrder = ({ th1, th2, th3, th4, th5, th6, th7 }) => {
  return (
    <thead>
      <tr>
        <th scope="col " className="text-capitalize text-secondary">
          {th1}
        </th>
        <th scope="col " className="text-capitalize text-secondary">
          {th2}
        </th>
        <th scope="col " className="text-capitalize text-secondary">
          {th3}
        </th>
        <th scope="col " className="text-capitalize text-secondary">
          {th4}
        </th>
        <th scope="col " className="text-capitalize text-secondary">
          {th5}
        </th>
        <th scope="col " className="text-capitalize text-secondary">
          {th6}
        </th>
        <th scope="col " className="text-capitalize text-secondary">
          {th7}
        </th>
      </tr>
    </thead>
  );
};

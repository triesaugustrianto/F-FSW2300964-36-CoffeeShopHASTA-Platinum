import React, { useContext, useState } from "react";
import { BreadCum, Errors, Loading, TheadUser } from "../../../components";
import useSWR from "swr";
import { fetcher } from "../../../fetch";
import { SearchConsum } from "../../../context/GlobalContext";

export const UserCms = () => {
  const [search] = useContext(SearchConsum);
  const [active, setActive] = useState("all");
  const { data, isLoading, error } = useSWR(
    `http://localhost:2000/api/users?active=${active}`,
    fetcher
  );
  if (isLoading) return <Loading />;
  if (error) return <Errors />;

  return (
    <div className="container-fluid">
      <BreadCum pg1={"customer"} pg2={"list"} />
      <div className="container d-flex justify-content-end gap-3 mb-4">
        <button
          className="btn btn-info text-white px-5"
          onClick={() => setActive("all")}
        >
          All
        </button>
        <button
          className="btn btn-success px-4"
          onClick={() => setActive(true)}
        >
          Active
        </button>
        <button
          className="btn btn-warning text-white"
          onClick={() => setActive(false)}
        >
          Non Active
        </button>
      </div>
      <div className="container table-responsive" style={{ fontSize: "14px" }}>
        <table className="table table-bordered">
          <TheadUser
            th1={"name"}
            th2={"email"}
            th3={"phone"}
            th4={"address"}
            th5={"role"}
            th6={"status"}
          />
          {data &&
            data
              .filter((item) => {
                if (search !== " ") {
                  return item.name.toLowerCase().includes(search);
                } else if (search === " ") {
                  return item;
                }
              })
              .map((e) => {
                return (
                  <tbody key={e.id}>
                    <tr>
                      <td>{e.name}</td>
                      <td>{e.email}</td>
                      <td>{e.phone}</td>
                      <td>{e.address}</td>
                      <td>{e.role}</td>
                      <td
                        className={
                          e.isConfirm
                            ? "text-success fw-bold"
                            : " text-danger fw-bold"
                        }
                      >
                        {e.isConfirm ? "Active" : "Non Active"}
                      </td>
                    </tr>
                  </tbody>
                );
              })}
        </table>
      </div>
    </div>
  );
};

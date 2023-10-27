import React, { useEffect, useState } from "react";
import {
  BreadCum,
  Errors,
  Loading,
  Nulls,
  TheadOrder,
} from "../../../components";
import DatePicker from "react-datepicker";
import useSWR from "swr";
import { fetcher } from "../../../fetch";
import moment from "moment/moment";
import { format } from "../../../fetch/format";
import axios from "axios";
export const ReportCms = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {
    axios
      .get(`http://localhost:2000/api/transaksi-report?month=${startDate}`)
      .then((res) => {
        const response = res.data.query;
        const coun = res.data.data;
        setData(response);
        setCount(coun);
      })
      .then((err) => console.error(err));
  }, [startDate]);

  return (
    <div className="container-fluid ">
      <div className="container d-flex justify-content-between">
        <BreadCum pg1={"Report"} pg2={"Month"} />
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="btn btn-success"
          showMonthYearPicker
        />
      </div>
      {data && data.length ? (
        <div className="container mt-5">
          <table className="table table-bordered" style={{ fontSize: "13px" }}>
            <TheadOrder
              isReport={true}
              th1={"No"}
              th2={"Customer"}
              th3={"Phone"}
              th4={"Date"}
              th5={"Product"}
              th6={"Qty"}
              th7={"Note"}
              th8={"Totals"}
              th9={"Checked"}
              th10={"Status"}
            />
            {data &&
              data.map((e, idx) => {
                return (
                  <tbody key={e.id}>
                    <tr>
                      <td>{idx + 1}</td>
                      <td>{e.user.map((u) => u.name)}</td>
                      <td>{e.user.map((u) => u.phone)}</td>
                      <td>{moment(e.createdAt).format("ll")}</td>
                      <td>
                        {e.transaksi.map((t) => {
                          return (
                            <tr key={t.id}>
                              <td>{t.name}</td>
                            </tr>
                          );
                        })}
                      </td>
                      <td>
                        {e.transaksi.map((t) => {
                          return (
                            <tr key={t.id}>
                              <td>{t.qty}</td>
                            </tr>
                          );
                        })}
                      </td>
                      <td>
                        {e.transaksi.map((t) => {
                          return (
                            <tr key={t.id}>
                              <td>{t.keterangan}</td>
                            </tr>
                          );
                        })}
                      </td>
                      <td>{format(e.totals)}</td>
                      <td>{e.checked === null ? "Admin" : e.checked}</td>
                      <td>{e.isPickup ? "Done" : "Pickup"}</td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
          <div className="">
            <h5>
              Average :{" "}
              <span className="fw-semibold text-success">
                {count && count.map((i) => format(i.sum))}
              </span>
            </h5>
            <h5>
              Totals :{" "}
              <span className="fw-semibold text-success">
                {count && count.map((i) => format(i.avg))}
              </span>
            </h5>
          </div>
        </div>
      ) : (
        <Nulls ket="Oops belumada data laporan !!" />
      )}
    </div>
  );
};

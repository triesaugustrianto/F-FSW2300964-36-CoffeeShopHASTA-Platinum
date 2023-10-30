import React, { useEffect, useState } from "react";
import { BreadCum, Modals, Nulls, TheadOrder } from "../../../components";
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment/moment";
import { format } from "../../../fetch/format";
import axios from "axios";
export const ReportCms = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState([]);
  const [id, setId] = useState(null);
  const [order, setOrder] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {
    if (id != null) {
      axios
        .get(`http://app-citrapersada.net:2000/api/transaksi/${id}`)
        .then((res) => {
          const response = res.data.query;
          setOrder(response);
        })
        .catch((err) => {
          if (err.response.status === 500) {
            toast.error("Error Notification !", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        });
    }
    axios
      .get(
        `http://app-citrapersada.net:2000/api/transaksi-report?month=${startDate}`
      )
      .then((res) => {
        const response = res.data.query;
        const coun = res.data.data;
        setData(response);
        setCount(coun);
      })
      .catch((err) => {
        if (err.response.status === 500) {
          toast.error("Error Notification !", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  }, [startDate, id]);

  return (
    <div className="container-fluid ">
      <ToastContainer />
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
              th1={"No"}
              th2={"Date"}
              th3={"Amount"}
              th4={"Money changes"}
              th5={"Checked"}
              th6={"Detail"}
              th7={"Status"}
            />
            {data &&
              data.map((e, idx) => {
                return (
                  <tbody key={e.id}>
                    <tr>
                      <td>{idx + 1}</td>
                      <td>{moment(e.createdAt).format("ll")}</td>
                      <td>{format(e.totals)}</td>
                      <td>{format(e.uang)}</td>
                      <td>{e.checked}</td>

                      <td>
                        <p
                          data-bs-toggle="modal"
                          data-bs-target="#seeReport"
                          onClick={() => setId(e.id)}
                        >
                          <a className="link-offset-3">Show more</a>
                        </p>
                      </td>
                      <td
                        className={
                          e.isPickup
                            ? "text-success fw-bold"
                            : "text-danger fw-bold"
                        }
                      >
                        {" "}
                        {e.isPickup ? "Done" : "Pickup"}
                      </td>
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
      <Modals
        id={"seeReport"}
        title={"Detail transaksi"}
        content={order.map((e) => {
          return (
            <div>
              <h6 className="fw-bold">Name : {e.user.map((u) => u.name)}</h6>
              {e.transaksi.map((i) => {
                return (
                  <div>
                    <div key={i.id} className="d-flex justify-content-between">
                      <span>{i.name}</span>
                      <span>{i.qty}</span>
                      <span>{i.keterangan}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      />
    </div>
  );
};

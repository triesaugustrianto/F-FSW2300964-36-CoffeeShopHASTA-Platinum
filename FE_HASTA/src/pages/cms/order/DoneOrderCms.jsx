import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../../fetch";
import {
  BreadCum,
  Errors,
  FormChecked,
  Loading,
  Modals,
  Nulls,
  TheadOrder,
} from "../../../components";
import { ToastContainer, toast } from "react-toastify";
import { Check2All, Check2Circle } from "react-bootstrap-icons";
import axios from "axios";
export const DoneOrderCms = () => {
  const token = sessionStorage.getItem("token");
  const [id, setId] = useState(null);
  const [order, setOrder] = useState([]);
  const handleCheck = (id) => {
    setId(id);
  };
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
  }, [id]);

  const { data, isLoading, error } = useSWR(
    `http://app-citrapersada.net:2000/api/transaksi-daily`,
    fetcher
  );
  if (isLoading) return <Loading />;
  if (error) return <Errors />;

  const Submits = (data) => {
    axios
      .put(
        `http://app-citrapersada.net:2000/api/transaksi-pickup/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "Acess-Control-Allow-Origin": "*",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          toast.success("Order ispickup !", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1200,
          });
          setTimeout(() => {
            window.location.href = "/adm/order/done";
            sessionStorage.setItem("act", "3");
          }, 1500);
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          toast.error("Error Notification !", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  };
  return (
    <div className="container-fluid mt-3">
      <ToastContainer />
      <BreadCum pg1={"Order"} pg2={"Done"} />
      {data && data.length ? (
        <div className="table-responsive ">
          <table className="table table-bordered" style={{ fontSize: "14px" }}>
            <TheadOrder
              th1={"ID"}
              th2={"Name"}
              th3={"Product"}
              th4={"Quantity"}
              th5={"Note"}
              th6={"Status"}
              th7={"Action"}
            />
            {data &&
              data.map((e) => {
                return (
                  <tbody key={e.id}>
                    <tr>
                      <td>HST- {e.id}</td>
                      <td>{e.user.map((e) => e.name)}</td>
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
                      <td
                        className={
                          e.isPickup
                            ? "text-success fw-bold"
                            : "text-danger fw-bold"
                        }
                      >
                        {e.isPickup ? "Done" : "Pickup"}
                      </td>
                      <td className="text-center">
                        <button
                          className="btn text-success fw-bold "
                          data-bs-toggle="modal"
                          data-bs-target="#pickup"
                          onClick={() => handleCheck(e.id)}
                          disabled={e.isPickup}
                        >
                          {e.isPickup ? <Check2All /> : <Check2Circle />}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
          <Modals
            id={"pickup"}
            title={"Pickup order"}
            content={
              order &&
              order.map((e) => {
                return (
                  <FormChecked
                    key={e.id}
                    name={e.user.map((u) => u.name)}
                    product={e.transaksi.map((u) => {
                      return (
                        <p key={u.id}>
                          {u.name} / {u.qty} / {u.keterangan}
                        </p>
                      );
                    })}
                    totals={e.totals}
                    uang={e.uang}
                    check={e.checked === null ? "admin" : e.checked}
                    kembalian={e.kembalian}
                    Submits={Submits}
                    isCheck={true}
                    title="Pickup"
                  />
                );
              })
            }
          />
        </div>
      ) : (
        <Nulls />
      )}
    </div>
  );
};

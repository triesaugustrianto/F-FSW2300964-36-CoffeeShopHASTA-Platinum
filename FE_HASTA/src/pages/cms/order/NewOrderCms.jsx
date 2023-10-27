import React, { useContext, useEffect, useState } from "react";
import {
  BreadCum,
  FormChecked,
  Modals,
  Nulls,
  TheadOrder,
} from "../../../components";
import { OrderConsum } from "../../../context/GlobalContext";
import { Check2Square } from "react-bootstrap-icons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
export const NewOrderCms = () => {
  const token = sessionStorage.getItem("token");
  const [id, setId] = useState(null);
  const [order] = useContext(OrderConsum);
  const [data, setData] = useState([]);
  const handleCheck = (id) => {
    setId(id);
  };
  useEffect(() => {
    if (id != null) {
      axios
        .get(`http://localhost:2000/api/transaksi/${id}`)
        .then((res) => {
          const response = res.data.query;
          setData(response);
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

  const Submits = (data) => {
    axios
      .put(`http://localhost:2000/api/transaksi-confirm/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          "Acess-Control-Allow-Origin": "*",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 201) {
          toast.success("Checked Success !", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1200,
          });
          setTimeout(() => {
            window.location.href = "/adm/order/check";
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
      <BreadCum pg1={"Order"} pg2={"New"} />
      {order && order.length ? (
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
            {order &&
              order.map((e) => {
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
                      <td className="text-success fw-bold">
                        {e.isConfirm ? null : "New"}
                      </td>
                      <td className="text-center">
                        <button
                          className="btn text-success fw-bold "
                          data-bs-toggle="modal"
                          data-bs-target="#check"
                          onClick={() => handleCheck(e.id)}
                        >
                          <Check2Square />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
          <Modals
            id={"check"}
            title={"Checked order"}
            content={
              data &&
              data.map((e) => {
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
                    kembalian={e.kembalian}
                    Submits={Submits}
                    title="Checked"
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

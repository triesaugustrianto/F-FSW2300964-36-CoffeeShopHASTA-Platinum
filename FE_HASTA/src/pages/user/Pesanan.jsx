import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetchToken } from "../../fetch";
import { Errors, Loading, Modals, Nulls, Struk } from "../../components";
import moment from "moment/moment";
import { format } from "../../fetch/format";
import DatePicker from "react-datepicker";
import { usePDF } from "react-to-pdf";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
export const Pesanan = () => {
  const { toPDF, targetRef } = usePDF({ filename: "receipt.pdf" });
  const [startDate, setStartDate] = useState(new Date());
  const [detail, setDetail] = useState([]);
  const [id, setId] = useState(null);
  useEffect(() => {
    if (id != null) {
      axios
        .get(`http://app-citrapersada.net:2000/api/transaksi/${id}`)
        .then((res) => {
          const response = res.data.query;
          setDetail(response);
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
    `http://app-citrapersada.net:2000/api/transaksi-user?day=${startDate}`,
    fetchToken
  );
  if (error) return <Errors />;
  if (isLoading) return <Loading />;

  const handlePesan = () => {
    window.location.href = "/user/menu";
    sessionStorage.setItem("nav", "2");
  };

  return (
    <div className="container-fluid">
      <ToastContainer />
      <div className="container d-flex flex-column gap-2 mb-5">
        <label htmlFor="">Periode</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="btn btn-success"
        />
      </div>
      {data && data.length ? (
        <div className="container">
          {data &&
            data.map((e) => {
              return (
                <div className="position-relative" key={e.id}>
                  <span
                    className="position-absolute top-0 end-0 bg-success text-white fw-medium shadow z-3"
                    style={{
                      borderTopRightRadius: "6px",
                      borderBottomLeftRadius: "12px",
                      padding: "10px 10px",
                      fontSize: "14px",
                    }}
                  >
                    {e.isDone ? (
                      "Selesai"
                    ) : (
                      <>{e.isConfirm ? "dibuat" : "menunggu"}</>
                    )}
                  </span>
                  <div className="" ref={targetRef}>
                    <Struk
                      date={moment(e.createdAt).format("lll")}
                      no={`HST-${e.id}-${moment(e.createdAt).format(
                        "MM-DD-YY"
                      )}`}
                      cs={e.checked}
                      to={format(e.totals)}
                      cash={format(e.uang)}
                      cange={format(e.kembalian)}
                      show={`#HST${e.id}`}
                      click={() => setId(e.id)}
                    />
                  </div>

                  <span className="position-absolute bottom-0 start-0  text-white  z-3">
                    {e.isDone ? (
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => toPDF()}
                      >
                        Download
                      </button>
                    ) : null}
                  </span>
                </div>
              );
            })}
        </div>
      ) : (
        <Nulls ket="Opps data tidak tersedia" click={handlePesan} />
      )}
      <Modals
        id={`detail`}
        title={"Detail product"}
        content={detail.map((d) => {
          return d.transaksi.map((i) => {
            return (
              <div key={i.id} className="d-flex justify-content-between">
                <span>{i.name}</span>
                <span>{i.qty}</span>
                <span>{i.keterangan}</span>
              </div>
            );
          });
        })}
      />
    </div>
  );
};

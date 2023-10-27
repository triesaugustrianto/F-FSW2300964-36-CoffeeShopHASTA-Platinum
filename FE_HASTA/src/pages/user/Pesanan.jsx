import React, { useState } from "react";
import useSWR from "swr";
import { fetchToken } from "../../fetch";
import { Errors, Loading, Nulls } from "../../components";
import moment from "moment/moment";
import { format } from "../../fetch/format";
import DatePicker from "react-datepicker";

export const Pesanan = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { data, isLoading, error } = useSWR(
    `http://localhost:2000/api/transaksi-user?day=${startDate}`,
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
                <div className="card text-center my-3" key={e.id}>
                  <div className="card-header text-start position-relative">
                    HST-{e.id}{" "}
                    <span
                      className="position-absolute top-0 end-0 bg-success text-white fw-medium shadow"
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
                  </div>
                  <div className="card-body">
                    <div className="">
                      <div className="border-bottom border-success pb-2">
                        {e.transaksi.map((i) => {
                          return (
                            <div
                              className="d-flex justify-content-between"
                              key={i.id}
                            >
                              <div className="">
                                <div>{i.name}</div>
                                <div style={{ fontSize: "12px" }}>
                                  *{i.keterangan}
                                </div>
                              </div>
                              <span>{i.qty}</span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="d-flex justify-content-between mt-3">
                        <h6>Totals:</h6>
                        <p>{format(e.totals)}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card-footer text-body-secondary text-end"
                    style={{ fontSize: "12px" }}
                  >
                    {moment(e.createdAt).format("ll")}
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <Nulls ket="Opps data tidak tersedia" click={handlePesan} />
      )}
    </div>
  );
};

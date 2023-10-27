import React, { useEffect, useState } from "react";
import { coffeTime } from "../../assets";
import { format } from "../../fetch/format";
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import { ExclamationCircle } from "react-bootstrap-icons";
import { ToastContainer, toast } from "react-toastify";
export const Checkout = () => {
  const token = sessionStorage.getItem("token");
  const handlePesan = () => {
    window.location.href = "/user/menu";
    sessionStorage.setItem("nav", "2");
  };
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:2000/api/checkout/${id}`)
      .then((res) => {
        if (res.status === 200) {
          window.location.href = "/user/order/";
        }
      })
      .catch((err) => console.log(err));
  };
  const [price, setPrice] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:2000/api/checkout-user`, {
        headers: {
          "Content-Type": "application/json",
          "Acess-Control-Allow-Origin": "*",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const response = res.data;
        setData(response.query);
        setPrice(response.totalPrice);
      })
      .catch((err) => console.log(err));
  }, []);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors },
  } = useForm();
  const { fields } = useFieldArray({
    control,
    name: "transaksi",
  });

  const totals = price.map((e) => e.sum);
  //submit pesanan
  const Submits = (data) => {
    axios
      .post(`http://localhost:2000/api/transaksi`, data, {
        headers: {
          "Content-Type": "application/json",
          "Acess-Control-Allow-Origin": "*",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 201) {
          toast.success("Payment Success !", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1200,
          });
          setTimeout(() => {
            window.location.href = "/user/order/pesanan";
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

  //change input tunai
  const handleChange = (e) => {
    const value = e.target.value;

    if (value < parseInt(totals)) {
      setError("uang", { type: "required" }, { shouldFocus: true });
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      {data && data.length ? (
        <form action="" onSubmit={handleSubmit(Submits)}>
          <div className="container-fluid min-vh-100  position-relative">
            <div className="card">
              <div className="card-body g-2 ">
                {data &&
                  data.map((e, idx) => {
                    return (
                      <div
                        className="border-bottom border-success py-2"
                        style={{ maxWidth: "540px" }}
                        key={idx}
                      >
                        <div className=" d-flex">
                          <div className="col">
                            <img
                              src={e.image}
                              className="img-fluid  rounded-3 object-fit-cover"
                              alt="image"
                              style={{
                                height: "150px",
                                width: "100px",
                              }}
                            />
                          </div>
                          <div className="col">
                            <h5 className="card-title text-capitalize">
                              <input
                                type="text"
                                className="form-control-plaintext "
                                {...register(`transaksi.${idx}.name`)}
                                value={e.product}
                              />
                            </h5>
                            <div className="card-text text-lowercase">
                              <input
                                type="text"
                                className="form-control-plaintext "
                                {...register(`transaksi.${idx}.keterangan`)}
                                value={`${e.size} / ${e.sweet} / ${e.availble}`}
                              />
                            </div>
                            <div className="card-text text-lowercase d-flex align-items-center ">
                              <span>*</span>
                              <input
                                type="number"
                                className="form-control-plaintext ms-1"
                                {...register(`transaksi.${idx}.qty`)}
                                value={e.qty}
                              />
                            </div>
                            <p className="card-text fw-bold text-secondary">
                              Rp {format(e.price)}
                            </p>
                            <button
                              className="btn btn-outline-danger fs-6"
                              onClick={() => handleDelete(e.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="card mt-4">
              <div className="card-body text-capitalize">
                <div className="d-flex justify-content-between">
                  <span>total pesanan :</span>{" "}
                  <input
                    type="number"
                    {...register("totals", {
                      required: true,
                      valueAsNumber: true,
                    })}
                    className="d-none"
                    value={totals}
                  />
                  <span>{format(totals)}</span>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <span>uang tunai :</span>{" "}
                  <input
                    type="number"
                    {...register("uang", {
                      required: true,
                      valueAsNumber: true,
                      minLength: 3,
                    })}
                    defaultValue={totals}
                    className="form-control w-50"
                    onChange={handleChange}
                  />
                </div>
                {errors.uang && (
                  <div
                    className="text-danger mt-2"
                    style={{ fontSize: "12px" }}
                  >
                    <ExclamationCircle /> Uang terlalu kecil
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4">
              <h6>Uang tunai : </h6>
              <div className="d-flex justify-content-start gap-3 ">
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={() => setValue("uang", 50000)}
                  disabled={50000 < parseInt(totals)}
                >
                  50.000
                </button>
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={() => setValue("uang", 100000)}
                  disabled={100000 < parseInt(totals)}
                >
                  100.000
                </button>
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={() => setValue("uang", 150000)}
                  disabled={150000 < parseInt(totals)}
                >
                  150.000
                </button>
              </div>
            </div>
            <button className="btn btn-success w-100 mt-4" type="submit">
              Payment
            </button>
          </div>
        </form>
      ) : (
        <div className="position-absolute top-50 start-50 translate-middle bg-secondary ">
          <div className="container">
            <div className="d-flex flex-column align-items-center">
              <p className="">Opps belum ada pesanan...</p>
              <img src={coffeTime} alt="loading" style={{ width: "150px" }} />
              <button className="btn btn-success mt-4" onClick={handlePesan}>
                Mulai pesan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

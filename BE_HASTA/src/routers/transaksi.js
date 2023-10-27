const express = require("express");
const {
  createTransaksi,
  getTransaksiAll,
  confirmTransaksi,
  doneTransaksi,
  getDailyTransaksi,
  getDetailTransaksi,
  getOrderUser,
  getNewOrder,
  getOrderCheck,
  pickupOrder,
  getTotalOrder,
  countNewOrder,
  getReportOrder,
} = require("../controllers/transaksi");
const checkToken = require("../middleware/checkToken");
const routeTransaksi = express.Router();
routeTransaksi.post("/api/transaksi", checkToken, createTransaksi);
routeTransaksi.get("/api/transaksi", getTransaksiAll);
routeTransaksi.get("/api/transaksi-newOrder", getNewOrder);
routeTransaksi.get("/api/transaksi-chekOrder", getOrderCheck);
routeTransaksi.get("/api/transaksi-user", checkToken, getOrderUser);
routeTransaksi.get("/api/transaksi-daily", getDailyTransaksi);
routeTransaksi.get("/api/transaksi/:id", getDetailTransaksi);
routeTransaksi.get("/api/transaksi-total", getTotalOrder);
routeTransaksi.get("/api/transaksi-totalnew", countNewOrder);
routeTransaksi.get("/api/transaksi-report", getReportOrder);
routeTransaksi.put("/api/transaksi-confirm/:id", checkToken, confirmTransaksi);
routeTransaksi.put("/api/transaksi-done/:id", checkToken, doneTransaksi);
routeTransaksi.put("/api/transaksi-pickup/:id", checkToken, pickupOrder);

module.exports = routeTransaksi;

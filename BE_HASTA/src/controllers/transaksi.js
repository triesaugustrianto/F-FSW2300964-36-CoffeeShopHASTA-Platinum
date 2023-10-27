const { request, response } = require("express");
const db = require("../db/db");
const moment = require("moment/moment");

//create
const createTransaksi = async (req = request, res = response) => {
  try {
    const { transaksi, totals, uang, user_id } = await req.body;

    const Transactiions = await db.transaction((trx) => {
      return trx("transaction")
        .insert({
          totals: parseInt(totals),
          uang: parseInt(uang),
          kembalian: parseInt(uang) - parseInt(totals),
          owner: user_id,
        })
        .returning("id")
        .then((id) => {
          const items = transaksi.map((item) => ({
            ...item,
            id_transaksi: id[0].id,
          }));
          return trx("items")
            .insert(items)
            .returning(["name", "qty", "keterangan"]);
        });
    });
    const update = await db("checkout")
      .where("owner", user_id)
      .update("isPay", true);

    res.status(201).json({
      status: true,
      message: "data success",
      query: Transactiions,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};

//getAll
const getTransaksiAll = async (req = request, res = response) => {
  try {
    const Transactiions = await db.transaction((trx) => {
      return trx("transaction")
        .select("*")
        .where("isConfirm", false)
        .andWhere("isDone", false)
        .andWhere("isPickup", false)
        .orderBy("createdAt", "desc")
        .then((data) => {
          return trx("items")
            .where("id_transaksi", data[0].id)
            .then((result) => {
              const struk = data.map((item) => ({
                ...item,
                transaksi: result,
              }));
              return struk;
            });
        })
        .then((data) => {
          return trx("users")
            .select("id", "name", "email", "phone", "address")
            .where("id", data[0].owner)

            .then((done) => {
              const finaly = data.map((item) => ({
                ...item,
                user: done,
              }));
              return finaly;
            });
        });
    });
    res.status(200).json({
      status: true,
      message: "data success",
      query: Transactiions,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};

//confrim transaksi
const confirmTransaksi = async (req = request, res = response) => {
  try {
    const { id } = await req.params;
    const { user_name } = await req.body;
    const updateData = await db("transaction")
      .where("id", id)
      .update({
        isConfirm: true,
        checked: user_name,
      })
      .returning([
        "id",
        "owner",
        "totals",
        "uang",
        "kembalian",
        "isConfirm",
        "isDone",
        "checked",
      ]);
    res.status(201).json({
      status: true,
      message: "data success updated",
      query: updateData,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};

//transaksi order done
const doneTransaksi = async (req = request, res = response) => {
  try {
    const { id } = await req.params;
    const updateData = await db("transaction")
      .where("id", id)
      .update({
        isDone: true,
      })
      .returning([
        "id",
        "owner",
        "totals",
        "uang",
        "kembalian",
        "isConfirm",
        "isDone",
        "checked",
      ]);
    res.status(201).json({
      status: true,
      message: "data success updated",
      query: updateData,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};

// transaksi pickup
const pickupOrder = async (req = request, res = response) => {
  try {
    const { id } = await req.params;
    const updateData = await db("transaction")
      .where("id", id)
      .update({
        isPickup: true,
      })
      .returning([
        "id",
        "owner",
        "totals",
        "uang",
        "kembalian",
        "isConfirm",
        "isDone",
        "checked",
      ]);
    res.status(201).json({
      status: true,
      message: "data success updated",
      query: updateData,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};
//get all done transaksi / day
const getDailyTransaksi = async (req = request, res = response) => {
  try {
    const day = new Date();
    const start = moment(day).startOf("days");
    const end = moment(day).endOf("days");
    const Transactiions = await db.transaction((trx) => {
      return trx("transaction")
        .select("*")
        .where("isConfirm", true)
        .andWhere("isDone", true)
        .andWhere("createdAt", ">", new Date(start))
        .andWhere("createdAt", "<", new Date(end))
        .orderBy("createdAt", "desc")
        .then((data) => {
          if (data.length) {
            return trx("items")
              .where("id_transaksi", data[0].id)
              .then((result) => {
                const struk = data.map((item) => ({
                  ...item,
                  transaksi: result,
                }));
                return struk;
              });
          }
        })
        .then((data) => {
          if (data != undefined) {
            return trx("users")
              .select("id", "name", "email", "phone", "address")
              .where("id", data[0].owner)

              .then((done) => {
                const finaly = data.map((item) => ({
                  ...item,
                  user: done,
                }));
                return finaly;
              });
          }
        });
    });
    res.status(200).json({
      status: true,
      message: "data success",
      query: Transactiions,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};

//getDetail order
const getDetailTransaksi = async (req = request, res = response) => {
  try {
    const { id } = await req.params;

    const Transactiions = await db.transaction((trx) => {
      return trx("transaction")
        .select("*")
        .where("id", id)
        .then((data) => {
          return trx("items")
            .where("id_transaksi", data[0].id)
            .then((result) => {
              const struk = data.map((item) => ({
                ...item,
                transaksi: result,
              }));
              return struk;
            });
        })
        .then((data) => {
          return trx("users")
            .select("id", "name", "email", "phone", "address")
            .where("id", data[0].owner)

            .then((done) => {
              const finaly = data.map((item) => ({
                ...item,
                user: done,
              }));
              return finaly;
            });
        });
    });
    res.status(200).json({
      status: true,
      message: "data success",
      query: Transactiions,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};

//get order by user
const getOrderUser = async (req = request, res = response) => {
  try {
    const { user_id } = await req.body;
    const { day } = await req.query;
    const start = moment(day).startOf("months");
    const end = moment(day).endOf("months");
    const Transactiions = await db.transaction((trx) => {
      return trx("transaction")
        .select("*")
        .orderBy("createdAt", "desc")
        .where("owner", user_id)
        .andWhere("createdAt", ">", new Date(start))
        .andWhere("createdAt", "<", new Date(end))
        .then((data) => {
          if (data.length) {
            return trx("items")
              .where("id_transaksi", data[0].id)
              .then((result) => {
                const struk = data.map((item) => ({
                  ...item,
                  transaksi: result,
                }));
                return struk;
              });
          }
        });
    });
    res.status(200).json({
      status: true,
      message: "data succsess",
      query: Transactiions,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};

//getnew order
const getNewOrder = async (req = request, res = response) => {
  try {
    const Transactiions = await db.transaction((trx) => {
      return trx("transaction")
        .select("*")
        .where("isConfirm", false)
        .andWhere("isDone", false)
        .andWhere("isPickup", false)
        .orderBy("createdAt", "desc")
        .then((data) => {
          if (data.length) {
            return trx("items")
              .where("id_transaksi", data[0].id)
              .then((result) => {
                const struk = data.map((item) => ({
                  ...item,
                  transaksi: result,
                }));
                return struk;
              });
          }
        })
        .then((data) => {
          if (data != undefined) {
            return trx("users")
              .select("id", "name", "email", "phone", "address")
              .where("id", data[0].owner)

              .then((done) => {
                const finaly = data.map((item) => ({
                  ...item,
                  user: done,
                }));
                return finaly;
              });
          }
        });
    });
    res.status(200).json({
      status: true,
      message: "data success",
      query: Transactiions,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};

//get chek order
const getOrderCheck = async (req = request, res = response) => {
  try {
    const Transactiions = await db.transaction((trx) => {
      return trx("transaction")
        .select("*")
        .where("isConfirm", true)
        .andWhere("isDone", false)
        .andWhere("isPickup", false)
        .orderBy("createdAt", "desc")
        .then((data) => {
          if (data.length) {
            return trx("items")
              .where("id_transaksi", data[0].id)
              .then((result) => {
                const struk = data.map((item) => ({
                  ...item,
                  transaksi: result,
                }));
                return struk;
              });
          }
        })
        .then((data) => {
          if (data != undefined) {
            return trx("users")
              .select("id", "name", "email", "phone", "address")
              .where("id", data[0].owner)

              .then((done) => {
                const finaly = data.map((item) => ({
                  ...item,
                  user: done,
                }));
                return finaly;
              });
          }
        });
    });
    res.status(200).json({
      status: true,
      message: "data success",
      query: Transactiions,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};

//count totoal sales
const getTotalOrder = async (req = request, res = response) => {
  try {
    const day = new Date();
    const start = moment(day).startOf("days");
    const end = moment(day).endOf("days");

    const getData = await db("transaction")
      .where("isPickup", true)
      .andWhere("createdAt", ">", new Date(start))
      .andWhere("createdAt", "<", new Date(end))
      .sum("totals")
      .count();
    res.status(200).json({
      status: true,
      message: "data success",
      query: getData,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};

//count new order
const countNewOrder = async (req = request, res = response) => {
  try {
    const day = new Date();
    const start = moment(day).startOf("days");
    const end = moment(day).endOf("days");
    const getData = await db("transaction")
      .where("isConfirm", false)
      .andWhere("isDone", false)
      .andWhere("isPickup", false)
      .andWhere("createdAt", ">", new Date(start))
      .andWhere("createdAt", "<", new Date(end))
      .count();
    res.status(200).json({
      status: true,
      message: "data success",
      query: getData,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};

//report
const getReportOrder = async (req = request, res = response) => {
  try {
    const { month } = await req.query;
    const start = moment(month).startOf("months");
    const end = moment(month).endOf("months");
    const Transactiions = await db.transaction((trx) => {
      return trx("transaction")
        .select("*")
        .where("isPickup", true)
        .andWhere("createdAt", ">", new Date(start))
        .andWhere("createdAt", "<", new Date(end))
        .orderBy("createdAt", "desc")
        .then((data) => {
          if (data.length) {
            return trx("items")
              .where("id_transaksi", data[0].id)
              .then((result) => {
                const struk = data.map((item) => ({
                  ...item,
                  transaksi: result,
                }));
                return struk;
              });
          }
        })
        .then((data) => {
          if (data != undefined) {
            return trx("users")
              .select("id", "name", "email", "phone", "address")
              .where("id", data[0].owner)

              .then((done) => {
                const finaly = data.map((item) => ({
                  ...item,
                  user: done,
                }));
                return finaly;
              });
          }
        });
    });
    const sumTotals = await db("transaction")
      .where("isPickup", true)
      .andWhere("createdAt", ">", new Date(start))
      .andWhere("createdAt", "<", new Date(end))
      .sum("totals")
      .avg("totals");

    res.status(200).json({
      status: true,
      message: "data success",
      query: Transactiions,
      data: sumTotals,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};
module.exports = {
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
};

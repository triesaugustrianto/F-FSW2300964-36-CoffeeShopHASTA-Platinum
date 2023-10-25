const { request, response } = require("express");
const db = require("../db/db");
const { uploadMinio } = require("../library/uploadMinio");

//get all product
const getAllProduct = async (req = request, res = response) => {
  try {
    const { categories } = await req.query;

    //find category
    const productCategory = await db("products").select("*");
    const category = productCategory.map((e) => e.category);
    const resultProduct = [...new Set(category)];

    //find data
    const resultData =
      categories === "all"
        ? await db("products")
            .where("statusProduct", true)
            .whereIn("category", resultProduct)
        : await db("products")
            .where("statusProduct", true)
            .where("category", categories);
    res.status(200).json({
      succes: true,
      query: resultData,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};

//create product
const createProduct = async (req = request, res = response) => {
  try {
    const url = await uploadMinio(req.file.path, req.file.originalname);
    const { name, price, category, description } = await req.body;

    if (url == null) {
      res.status(500).json({
        success: false,
        message: "error uploading",
      });
    } else {
      const createData = await db("products")
        .insert({
          name: name,
          price: parseInt(price),
          category: category,
          description: description,
          image: url,
        })
        .returning(["name", "price", "category", "description", "image"]);
      res.status(201).json({
        success: true,
        message: "create product succes ",
        query: createData,
      });
    }
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};
//get detail product
const getDetailProduct = async (req = request, res = response) => {
  try {
    const { id } = await req.params;

    const getData = await db("products").where("id", id);
    res.status(200).json({
      status: true,
      query: getData,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};

//update product
const editProduct = async (req = request, res = response) => {
  try {
    const { id } = await req.params;
    const { name, price, category, description, active } = await req.body;
    const url = await uploadMinio(req.file.path, req.file.originalname);

    const updateData = await db("products")
      .where("id", id)
      .update({
        name: name,
        price: parseInt(price),
        category: category,
        description: description,
        image: url,
        statusProduct: active === "true" ? true : false,
      })
      .returning(["name", "price", "category", "description", "image"]);
    res.status(201).json({
      success: true,
      message: "update product succes ",
      query: updateData,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};

//delete product
const nonAktipproduct = async (req = request, res = response) => {
  try {
    const { id } = await req.params;
    const nonAktip = await db("products").where("id", id).update({
      statusProduct: false,
    });
    res.status(200).json({
      succes: true,
      message: "data succes nonactive",
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};

//get category produck and id
const getCategoriProduct = async (req = request, res = response) => {
  try {
    const { id } = await req.query;

    const findProduct = await db("products").select("id");
    const resultId = findProduct.map((e) => e.id);

    const getData =
      id === "all"
        ? await db("products")
            .where("statusProduct", true)
            .whereIn("id", resultId)
            .orderBy("category", "asc")
        : await db("products").where("id", id).where("statusProduct", true);

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

const getGroupproduct = async (req = request, res = response) => {
  try {
    const { categori } = await req.query;
    const getData = await db("products")
      .select("id", "name", "category")
      .where("statusProduct", true)
      .andWhere("category", categori)
      .orderBy("name", "asc");

    res.status(200).json({
      status: true,
      message: "data succes ",
      query: getData,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};

//get product admin
const getProductAdmin = async (req = request, res = response) => {
  try {
    const getData = await db("products").select("*").orderBy("category", "asc");
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
module.exports = {
  getAllProduct,
  createProduct,
  getDetailProduct,
  editProduct,
  nonAktipproduct,
  getCategoriProduct,
  getGroupproduct,
  getProductAdmin,
};

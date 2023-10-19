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
        ? await db("products").whereIn("category", resultProduct)
        : await db("products").where("category", categories);
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
    const { name, price, category, description } = await req.body;
    const url = await uploadMinio(req.file.path, req.file.originalname);

    const updateData = await db("products")
      .where("id", id)
      .update({
        name: name,
        price: parseInt(price),
        category: category,
        description: description,
        image: url,
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
module.exports = {
  getAllProduct,
  createProduct,
  getDetailProduct,
  editProduct,
  nonAktipproduct,
};

const express = require("express");
const {
  getAllProduct,
  createProduct,
  getDetailProduct,
  editProduct,
  nonAktipproduct,
  getCategoriProduct,
  getGroupproduct,
  getProductAdmin,
  getCountProduct,
} = require("../controllers/productController");
const uploadProduct = require("../middleware/productUpload");
const routeProduct = express.Router();
routeProduct.post("/api/product", uploadProduct.single("image"), createProduct);
routeProduct.get("/api/product", getAllProduct);
routeProduct.get("/api/productss", getProductAdmin);
routeProduct.get("/api/product-categori", getCategoriProduct);
routeProduct.get("/api/product-group", getGroupproduct);
routeProduct.get("/api/product/:id", getDetailProduct);
routeProduct.get("/api/product-count", getCountProduct);
routeProduct.put(
  "/api/product/:id",
  uploadProduct.single("image"),
  editProduct
);
routeProduct.delete("/api/product/delete/:id", nonAktipproduct);
module.exports = routeProduct;

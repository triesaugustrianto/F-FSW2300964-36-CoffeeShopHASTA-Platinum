const express = require("express");
const {
  createUsers,
  confirmUsers,
  resetPassword,
  updatePassword,
  getDetailUser,
  getAllUsers,
  updateProfil,
  loginUser,
  countUser,
} = require("../controllers/userController");
const checkToken = require("../middleware/checkToken");
const routeUser = express.Router();
routeUser.post("/api/users", createUsers);
routeUser.post("/api/users-login", loginUser);
routeUser.post("/api/users/reset-password", resetPassword);
routeUser.get("/api/users", getAllUsers);
routeUser.get("/api/user", checkToken, getDetailUser);
routeUser.get("/api/user-count", countUser);
routeUser.put("/api/users/update-password/:id", updatePassword);
routeUser.put("/api/users/confirm/:id", confirmUsers);
routeUser.put("/api/users/update", checkToken, updateProfil);

module.exports = routeUser;

const { request, response } = require("express");
require("dotenv").config();
const argon2 = require("argon2");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const db = require("../db/db");
const jwt = require("jsonwebtoken");
//create users
const createUsers = async (req = request, res = response) => {
  try {
    const { name, phone, email, address, password, role } = await req.body;

    //hash password
    const hashPassword = await argon2.hash(password);
    //email transporter
    const transporter = nodemailer.createTransport(
      smtpTransport({
        host: "mail.citrapersada.net",
        secureConnection: false,
        tls: {
          rejectUnauthorized: false,
        },
        port: 465,
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
      })
    );
    //id user
    const id = uuidv4();
    //check email
    const findData = await db("users")
      .select("email")
      .where("email", email)
      .first();

    //check user
    if (findData) {
      return res.status(400).json({
        success: false,
        message: "user already exist !!",
      });
    } else {
      //create data
      const createUser = await db("users")
        .insert({
          id: id,
          name: name,
          phone: phone,
          email: email,
          address: address,
          password: hashPassword,
          role: !role ? "user" : role,
        })
        .returning(["name", "phone", "email", "address"]);
      transporter.sendMail({
        from: process.env.USER,
        to: email,
        subject: "Confirmation Account",
        html: `
               <p>Welcome : ${email}</p>
               <p>You can confirm your account email through the link below: <span><a href="http://localhost:5173/confirm/${id}" target=_blank>http://localhost:5173/confirm</a></span></p>
                </hr>
                ©${new Date().getFullYear()}IT_Citra-Persada-Infrastruktur
      `,
      });
      res.status(201).json({
        status: true,
        message: "registratsi user success",
        query: createUser,
      });
    }
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};
//confirmasi users
const confirmUsers = async (req = request, res = response) => {
  try {
    const { id } = await req.params;
    const updateData = await db("users").where("id", id).update({
      isConfirm: true,
    });
    res.status(201).json({
      status: true,
      message: "confirm users success",
      query: updateData,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};
//reset password user
const resetPassword = async (req = request, res = response) => {
  try {
    const { email } = await req.body;
    const transporter = nodemailer.createTransport(
      smtpTransport({
        host: "mail.citrapersada.net",
        secureConnection: false,
        tls: {
          rejectUnauthorized: false,
        },
        port: 465,
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
      })
    );
    //find data
    const findUsers = await db("users")
      .select("*")
      .where("email", email)
      .first();

    if (!findUsers) {
      return res.status(400).json({
        succes: false,
        message: "email tidak terdaftar",
      });
    } else {
      transporter.sendMail({
        from: process.env.USER,
        to: email,
        subject: "Reset Password",
        html: `
        <p>Link reset password : <a href="http://localhost:5173/password/${
          findUsers.id
        }" target=_blank>http://localhost:5173</a></p>
        </br>
        </hr>
        ©${new Date().getFullYear()}IT_Citra-Persada-Infrastruktur
        `,
      }),
        res.status(201).json({
          succes: true,
          message: "reset password sukses",
          query: findUsers,
        });
    }
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};
//update password user
const updatePassword = async (req = request, res = response) => {
  try {
    const { id } = await req.params;
    const { password } = await req.body;
    const hashPassword = await argon2.hash(password);
    const updateData = await db("users").where("id", id).update({
      password: hashPassword,
    });
    res.status(201).json({
      status: true,
      message: "password success updated",
      query: updateData,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};
//get detail user
const getDetailUser = async (req = request, res = response) => {
  try {
    const { user_id } = await req.body;
    const getData = await db("users").select("*").where("id", user_id);
    res.status(200).json({
      status: true,
      message: "data is displayed successfully",
      query: getData,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};
//get all users
const getAllUsers = async (req = request, res = response) => {
  try {
    const { active } = await req.query;
    const getData =
      active === "all"
        ? await db("users")
            .select(
              "id",
              "name",
              "email",
              "phone",
              "address",
              "role",
              "isConfirm"
            )
            .orderBy("name", "asc")
        : await db("users")
            .select(
              "id",
              "name",
              "email",
              "phone",
              "address",
              "role",
              "isConfirm"
            )
            .where("isConfirm", active)
            .orderBy("name", "asc");
    res.status(200).json({
      status: true,
      message: "data is displayed successfully",
      query: getData,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};
//update profil
const updateProfil = async (req = request, res = response) => {
  try {
    // const { id } = await req.params;
    const { name, phone, email, address, password, user_id } = await req.body;

    //hash password
    const hashPassword = await argon2.hash(password);
    //find user
    const findUser = await db("users").select("*").where("id", user_id).first();

    // updatedata
    const updateData = await db("users")
      .select("*")
      .where("id", user_id)
      .update({
        name: name,
        phone: phone,
        email: email,
        address: address,
        password: !password ? findUser.password : hashPassword,
      });
    res.status(201).json({
      status: true,
      message: "success updated",
      query: updateData,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};

//login
const loginUser = async (req = request, res = response) => {
  try {
    const { email, password } = await req.body;

    //find Data
    const findUser = await db("users")
      .select("*")
      .where("email", email)
      .first();

    //check users
    if (!findUser) {
      return res.status(404).json({
        message: "user not found !!",
      });
    }
    //check aktip
    const aktif = findUser.isConfirm;

    if (!aktif) {
      return res.status(403).json({
        succes: false,
        message: "user nof confirm",
      });
    }
    //check password
    const match = await argon2.verify(findUser.password, password);

    if (!match) {
      return res.status(400).json({
        succes: false,
        message: "password wrong",
      });
    }

    // generate token
    const token = await jwt.sign(
      {
        user_id: findUser.id,
        user_name: findUser.name,
        user_email: findUser.email,
        Role: findUser.role,
      },
      process.env.SECRET,
      { expiresIn: "1d" }
    );
    res.status(201).json({
      status: true,
      message: "login Berhasil",
      token: token,
      query: findUser,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};

//count user active
const countUser = async (req = request, res = response) => {
  try {
    const contData = await db("users").where("isConfirm", true).count();
    res.status(200).json({
      status: true,
      message: "data success ",
      query: contData,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      error: error.message,
    });
  }
};
module.exports = {
  createUsers,
  confirmUsers,
  resetPassword,
  updatePassword,
  getDetailUser,
  getAllUsers,
  updateProfil,
  loginUser,
  countUser,
};

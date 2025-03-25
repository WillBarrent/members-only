const { createUser } = require("../db/db");
const { validationResult } = require("express-validator");
const { hashPassword } = require("../utils/authUtils");
const pool = require("../db/pool");

async function signUpGet(req, res, next) {
  res.render("signup");
}

async function signUpPost(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("signup");
    }

    const { firstname, lastname, username, password } =
      req.body;

    const hashedPassword = await hashPassword(password);
    const result = await createUser(
      firstname,
      lastname,
      username,
      hashedPassword
    );

    if (!result) {
      return res.render("signup");
    }

    return res.redirect("/login");
  } catch (err) {
    return next(err);
  }
}

async function loginGet(req, res, next) {
  res.send("Login form.");
}

module.exports = {
  signUpGet,
  signUpPost,
  loginGet,
};

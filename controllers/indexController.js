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

    const { firstname, lastname, username, password } = req.body;

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

async function joinTheClubGet(req, res, next) {
  console.log(req.session);
  res.render("join-the-club");
}

async function joinTheClubPost(req, res, next) {
  const { membershipPassword } = req.body;

  if (membershipPassword === process.env.MEMBERSHIP_PASSWORD) {
    return res.redirect("/login");
  }

  res.redirect("/join-the-club");
}

async function loginGet(req, res, next) {
  res.render("login");
}

module.exports = {
  signUpGet,
  signUpPost,
  joinTheClubGet,
  joinTheClubPost,
  loginGet,
};

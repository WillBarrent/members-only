const { createUser, giveMembership, isUserTheMember } = require("../db/db");
const { validationResult } = require("express-validator");
const { hashPassword } = require("../utils/passwordUtils");
const passport = require("passport");

async function signUpGet(req, res, next) {
  res.render("signup");
}

async function signUpPost(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("signup", { errors: errors.array() });
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
  if (!req.session.hasOwnProperty("passport")) {
    return res.redirect("/sign-up");
  }

  const isMember = await isUserTheMember(req.session.passport.user);

  if (isMember) {
    return res.redirect("/");
  }

  return res.render("join-the-club");
}

async function joinTheClubPost(req, res, next) {
  const { membershipPassword } = req.body;

  if (membershipPassword === process.env.MEMBERSHIP_PASSWORD) {
    const userId = req.session.passport.user;
    await giveMembership(userId);
    return res.redirect("/");
  }

  return res.redirect("/join-the-club");
}

const loginPost = [
  (req, res, next) => {
    req.session.messages = [];
    next();
  },
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/join-the-club",
    failureMessage: true,
  }),
];

async function loginGet(req, res, next) {
  if (
    req.session.hasOwnProperty("messages") &&
    req.session.messages.length !== 0
  ) {
    const err = req.session.messages[0];
    console.log(req.session.messages);
    req.session.messages = [];
    return res.render("login", { err: err });
  }

  return res.render("login");
}

module.exports = {
  signUpGet,
  signUpPost,
  joinTheClubGet,
  joinTheClubPost,
  loginGet,
  loginPost,
};

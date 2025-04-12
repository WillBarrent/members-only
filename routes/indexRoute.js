const { Router } = require("express");
const {
  signUpValidation,
  loginValidation,
} = require("../utils/validationUtils");
const {
  signUpPost,
  signUpGet,
  loginGet,
  joinTheClubGet,
  joinTheClubPost,
  loginPost,
  indexGet,
  logoutGet,
} = require("../controllers/indexController");
const passport = require("passport");

const indexRouter = Router();

indexRouter.get("/", indexGet);

indexRouter.get("/sign-up", signUpGet);
indexRouter.post("/sign-up", signUpValidation, signUpPost);
indexRouter.get("/join-the-club", joinTheClubGet);
indexRouter.post("/join-the-club", joinTheClubPost);

indexRouter.get("/login", loginGet);
indexRouter.post("/login", loginValidation, loginPost);

indexRouter.get("/logout", logoutGet);

module.exports = indexRouter;

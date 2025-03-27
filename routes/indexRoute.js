const { Router } = require("express");
const { signUpValidation } = require("../utils/validationUtils");
const {
  signUpPost,
  signUpGet,
  loginGet,
  joinTheClubGet,
  joinTheClubPost,
} = require("../controllers/indexController");
const passport = require("passport");
const indexRouter = Router();

indexRouter.get("/", (req, res, next) => {
  console.log(req.session);
  res.send("Hey!");
});

indexRouter.get("/sign-up", signUpGet);
indexRouter.post("/sign-up", signUpValidation, signUpPost);
indexRouter.get("/join-the-club", joinTheClubGet);
indexRouter.get("/join-the-club", joinTheClubPost);

indexRouter.get("/login", loginGet);
indexRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/",
    successRedirect: "/",
  }),
  (req, res, next) => {}
);

module.exports = indexRouter;

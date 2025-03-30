const { Router } = require("express");
const { signUpValidation, loginValidation } = require("../utils/validationUtils");
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
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    return res.send("Hello!");
  } else {
    return res.send("You are not authenticated.");
  }
});

indexRouter.get("/sign-up", signUpGet);
indexRouter.post("/sign-up", signUpValidation, signUpPost);
indexRouter.get("/join-the-club", joinTheClubGet);
indexRouter.post("/join-the-club", joinTheClubPost);

indexRouter.get("/login", loginGet);
indexRouter.post(
  "/login",
  loginValidation,
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/join-the-club",
  })
);

module.exports = indexRouter;

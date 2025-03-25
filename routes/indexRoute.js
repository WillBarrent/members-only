const { Router } = require("express");
const { signUpValidation } = require("../utils/validationUtils");
const {
  signUpPost,
  signUpGet,
  loginGet,
} = require("../controllers/indexController");
const indexRouter = Router();

indexRouter.get("/sign-up", signUpGet);
indexRouter.post("/sign-up", signUpValidation, signUpPost);

indexRouter.get("/login", loginGet);

module.exports = indexRouter;

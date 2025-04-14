const { body } = require("express-validator");

const signUpValidation = [
  body("firstname")
    .notEmpty()
    .withMessage("First name must be filled")
    .isAlpha()
    .withMessage("First name must only contain alphabetic letters.")
    .isLength({ min: 3, max: 15 })
    .withMessage("The length of the first name is between 2 and 15 included."),
  body("lastname")
    .notEmpty()
    .withMessage("Last name must be filled")
    .isAlpha()
    .withMessage("Last name must only contain alphabetic letters.")
    .isLength({ min: 3, max: 15 })
    .withMessage("The length of the last name is between 2 and 15 included."),
  body("username")
    .notEmpty()
    .withMessage("Username must be filled")
    .isAlpha()
    .withMessage("Username must only contain alphabetic letters.")
    .isLength({ min: 3, max: 15 })
    .withMessage("The length of the username is between 2 and 15 included."),
  body("password")
    .notEmpty()
    .withMessage("Password must be filled")
    .isAlphanumeric()
    .withMessage("Password must contain alphabetic letters and numbers.")
    .isLength({ min: 8 })
    .withMessage("Password must contain at least 8 characters."),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match."),
];

const loginValidation = [
  body("username").notEmpty().withMessage("Username must be filled."),
  body("password").notEmpty().withMessage("Password must be filled"),
];

const newMessageValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ min: 3, max: 50 })
    .withMessage("It seems you are out of range of title length (3-50)"),
  body("message")
    .notEmpty()
    .withMessage("Message cannot be empty")
    .isLength({ min: 3, max: 255 })
    .withMessage("It seems you are out of range of message length (3-255)"),
];

module.exports = { signUpValidation, loginValidation, newMessageValidation };

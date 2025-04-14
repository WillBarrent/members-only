const { validationResult } = require("express-validator");
const {
  createNewMessage,
  getUserName,
  deleteMessageById,
} = require("../db/db");

async function createMessageGet(req, res, next) {
  if (req.isAuthenticated()) {
    if (!req.session.hasOwnProperty("username")) {
      const username = await getUserName(req.session.passport.user);
      req.session.username = username;
    }

    return res.render("new-message");
  }

  return res.render("login");
}

async function createMessagePost(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.render("new-message", { errors: errors.array() });
    }

    const date = new Date(Date.now());
    const added = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    const { title, message } = req.body;
    const author = req.session.username;

    await createNewMessage(title, message, added, author);

    res.redirect("/");
  } catch (err) {
    next(err);
  }
}

async function deleteMessageGet(req, res, next) {
  const { messageId } = req.params;
  await deleteMessageById(messageId);
  res.redirect("/");
}

module.exports = {
  createMessageGet,
  createMessagePost,
  deleteMessageGet,
};

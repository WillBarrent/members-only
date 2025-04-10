const { createNewMessage } = require("../db/db");

async function createMessageGet(req, res, next) {
  if (req.isAuthenticated()) {
    return res.render("new-message");
  }

  return res.render("login");
}

async function createMessagePost(req, res, next) {
  const date = new Date(Date.now());
  const added = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  const { title, message } = req.body;
  const authorId = req.session.passport.user;

  await createNewMessage(title, message, added, authorId);

  res.redirect("/");
}

module.exports = {
  createMessageGet,
  createMessagePost,
};

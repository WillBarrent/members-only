const { createNewMessage, getUserName } = require("../db/db");

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
  const date = new Date(Date.now());
  const added = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  const { title, message } = req.body;
  const author = req.session.username;

  await createNewMessage(title, message, added, author);

  res.redirect("/");
}

module.exports = {
  createMessageGet,
  createMessagePost,
};

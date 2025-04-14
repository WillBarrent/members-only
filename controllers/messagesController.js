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
  const date = new Date(Date.now());
  const added = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  const { title, message } = req.body;
  const author = req.session.username;

  await createNewMessage(title, message, added, author);

  res.redirect("/");
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

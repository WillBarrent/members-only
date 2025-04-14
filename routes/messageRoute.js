const { Router } = require("express");
const {
  createMessageGet,
  createMessagePost,
  deleteMessageGet,
} = require("../controllers/messagesController");

const messagesRouter = Router();

messagesRouter.get("/create-new-message", createMessageGet);
messagesRouter.post("/create-new-message", createMessagePost);
messagesRouter.get("/delete/:messageId", deleteMessageGet);

module.exports = messagesRouter;

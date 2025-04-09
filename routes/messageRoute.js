const { Router } = require("express");
const { createMessageGet } = require("../controllers/messagesController");

const messagesRouter = Router();

messagesRouter.get("/", createMessageGet);
messagesRouter.post("/", createMessagePost);

module.exports = messagesRouter;
const path = require("node:path");
const express = require("express");
const session = require("express-session");
const app = express();
const pool = require("./db/pool");
const pgSession = require("connect-pg-simple")(session);

require("dotenv").config();

const assetsPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

const sessionStore = new pgSession({
  pool: pool,
  tableName: "user_sessions",
  createTableIfMissing: true,
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("App is listening on PORT", PORT);
});

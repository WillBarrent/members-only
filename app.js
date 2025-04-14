require("dotenv").config();

const path = require("node:path");
const express = require("express");
const session = require("express-session");
const app = express();
const pool = require("./db/pool");
const passport = require("passport");
const indexRouter = require("./routes/indexRoute");
const messageRouter = require("./routes/messageRoute");
const pgSession = require("connect-pg-simple")(session);
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

require("./passport");

app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/", messageRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("App is listening on PORT", PORT);
});

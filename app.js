const path = require("node:path");
const express = require("express");
const app = express();

require("dotenv").config();

const assetsPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("App is listening on PORT", PORT);
});

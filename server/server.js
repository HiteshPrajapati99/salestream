const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// use Morgan
// const Morgan = require("morgan");

// app.use(Morgan("dev")); // morgan show req route in console its used to know which api route is called

// DataBase Connect
require("./services/ConDB");

// View For password reset
app.set("view engine", "ejs");

// Handling JSON data
app.use(bodyParser.json());
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true, limit: "1mb" })); // to support URL-encoded bodies
app.use(cors({ origin: "*" })); // cors policy

// This Routes Used For Image View in Front End and Admin Dashbord
app.use("/images/product", express.static("images/product"));
app.use("/images/blog", express.static("images/blog"));
app.use("/images/Brand", express.static("images/Brand"));
app.use("/images/product_banner", express.static("images/product_banner"));

// Route api
const user = require("./routes/Frontend");
const admin = require("./routes/app");

app.use("/api", user);
app.use("/store", admin);

// Test Api
app.get("/", function (req, res) {
  res.json("server Working fine !!!...");
});

const address = require("address");
const PORT = 5000 || process.env.PORT;

// address((err, data) => {
//   console.log(data.ipv6);
// });

const { encrypt } = require("./middlewares/crypto");

app.listen(PORT, function () {
  console.log("server Runnig", "PORT: " + PORT);
});

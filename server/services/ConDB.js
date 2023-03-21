const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const DBURL = process.env.MONGODB_URL;
// const DBURL = "mongodb://127.0.0.1:27017/MyShopify";

// start Connection
mongoose.set("strictQuery", false);
mongoose.connect(DBURL);

// Error Hendling
const conn = mongoose.connection;
conn.on("connected", function () {
  console.log("Successfully connected to MongoDB !!!");
});
conn.on("disconnected", function () {
  console.log("Successfully disconnected to MongoDB !!!");
});
conn.on("error", console.error.bind(console, "connection error:"));

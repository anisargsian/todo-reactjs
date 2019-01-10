const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config");
const todoRoutes = require("./todoRoutes");

const app = express();

const port = config.API_PORT;
const dbUrl = config.DB;

mongoose.connect(dbUrl, { useNewUrlParser: true});
let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", todoRoutes);

app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));
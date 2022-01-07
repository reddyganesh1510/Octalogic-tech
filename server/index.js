const express = require("express");

const cors = require("cors");
const bp = require("body-parser");
const formData = require("express-form-data");

require("dotenv").config();

const app = express();

app.use(cors());

const port = 8000;

const db = require("./config/mongoose");

const path = require("path");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(formData.parse());

// use express router
app.use("/", require("./routes"));

var server = app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }

  console.log(`Server is running on port: ${port}`);
});

// server.timeout = 1000 * 60 * 10;

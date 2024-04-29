const express = require("express");
const connectDB = require("./dbconnect.js");
const { PORT } = require("./dotenvconfig.js");

const app = express();

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

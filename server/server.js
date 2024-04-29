const express = require("express");
const connectDB = require("./dbconnect.js");
const { PORT } = require("./dotenvconfig.js");
const appRoutes = require("./routes/routes.js");

const app = express();
app.use(express.json());

connectDB();

app.get("/", appRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

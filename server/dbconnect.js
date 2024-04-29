const mongoose = require("mongoose");
const { MONGO_URI } = require("./dotenvconfig");

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB verbunden");
  } catch (err) {
    console.error("MongoDB Verbindungsfehler:", err);
    process.exit(1); //exit with failure
  }
};

module.exports = connectDB;

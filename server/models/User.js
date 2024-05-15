const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },

  role: {
    type: String,
    required: true,
    default: "admin",
    enum: ["admin", "superuser"],
  },
});

module.exports = mongoose.model("User", userSchema);

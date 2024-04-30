const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  // email: { type: String, required: true, unique: true },
  // isAdmin: { type: Boolean, required: true, default: true },
  // isSuperUser: { type: Boolean, required: true, default: false }, // Standardwert ist false
  role: {
    type: String,
    required: true,
    default: "admin",
    enum: ["admin", "superuser"],
  },
});

module.exports = mongoose.model("User", userSchema);

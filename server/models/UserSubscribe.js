const mongoose = require("mongoose");

const newsletterSubscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  subscribedAt: { type: Date, default: Date.now }, // Das Datum, an dem der Benutzer sich angemeldet hat
  isSubscribed: { type: Boolean, default: true }, // Gibt an, ob der Benutzer für den Newsletter angemeldet ist (standardmäßig true)
});

module.exports = mongoose.model("UserSubscribe", userSubscribeSchema);

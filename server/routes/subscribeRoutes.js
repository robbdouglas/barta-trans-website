const express = require("express");
const router = express.Router();
const UserSubscribe = require('../models/UserSubscribe');

console.log("subscribeRoutes.js loaded");

router.post('/', async (req, res) => {
  console.log("POST /subscribe called");
  const { email, firstName, lastName } = req.body;
  try {
    let subscriber = await UserSubscribe.findOne({ email });
    if (subscriber) {
      return res.status(400).send('Email is already subscribed.');
    }
    subscriber = new UserSubscribe({ email, firstName, lastName, isSubscribed: true });
    await subscriber.save();
    res.status(201).send('Subscription successful.');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;

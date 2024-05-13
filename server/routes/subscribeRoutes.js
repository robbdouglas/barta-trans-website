const express = require("express");
const router = express.Router();
const UserSubscribe = require('../models/UserSubscribe'); 

router.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  try {
    let subscriber = await UserSubscribe.findOne({ email });
    if (subscriber) {
      return res.status(400).send('Email is already subscribed.');
    }
    subscriber = new UserSubscribe({ email, isSubscribed: true });
    await subscriber.save();
    res.status(201).send('Subscription successful.');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;

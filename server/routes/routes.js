const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User.js");
const News = require("../models/News.js");
const Job = require("../models/Job.js");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");

// Validation rules
const userValidationRules = [
  body("username")
    .isLength({ min: 5 })
    .withMessage("Username must be at least 5 characters long"),
  body("email").isEmail().withMessage("Must be a valid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// Validation function
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// User API CRUD operations
router.post("/users", userValidationRules, validate, async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = new User({ ...req.body, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/users", authenticateToken, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/users/:id", authenticateToken, async (req, res) => {
  const hashedPassword = req.body.password
    ? await bcrypt.hash(req.body.password, 10)
    : undefined;
  try {
    const update = {
      ...req.body,
      ...(hashedPassword && { password: hashedPassword }),
    };
    const updatedUser = await User.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/users/:id", authenticateToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

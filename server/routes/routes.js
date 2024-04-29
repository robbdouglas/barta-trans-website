const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User.js");
const News = require("../models/News.js");
const Job = require("../models/Job.js");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken.js");
const jwt = require("jsonwebtoken");

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

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send("Benutzer nicht gefunden");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).send("Ungültiges Passwort");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).send(error);
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

// News CRUD operations
router.post("/news", authenticateToken, async (req, res) => {
  const newNews = new News({ ...req.body, author: req.user.userId });
  try {
    await newNews.save();
    res.status(201).send(newNews);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/news", async (req, res) => {
  try {
    const news = await News.find().populate("author");
    res.status(200).send(news);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/news/:id", authenticateToken, async (req, res) => {
  try {
    const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(updatedNews);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/news/:id", authenticateToken, async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
});

// Job CRUD operations
router.post("/jobs", authenticateToken, async (req, res) => {
  const newJob = new Job({ ...req.body, postedBy: req.user.userId });
  try {
    await newJob.save();
    res.status(201).send(newJob);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy");
    res.status(200).send(jobs);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/jobs/:id", authenticateToken, async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(updatedJob);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/jobs/:id", authenticateToken, async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

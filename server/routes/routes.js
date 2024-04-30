const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken.js");
const authenticateRole = require("../middleware/authenticateRole.js");
const userController = require("../controllers/userController");
const newsController = require("../controllers/newsController");
const jobController = require("../controllers/jobController");
const UserSubscribe = require("../models/UserSubscribe"); // Stellen Sie sicher, dass Sie das Modell importieren.

const { userValidationRules, validate } = require("../middleware/validation");

// router.post(
//   "/users",
//   userValidationRules(),
//   validate,
//   userController.createUser
// );
router.post(
  "/login",
  authenticateRole("admin", "superuser"),
  userController.loginUser
);
router.get("/users", authenticateToken, userController.getUsers);
// router.put("/users/:id", authenticateToken,authenticateRole("admin", "superuser"), userController.updateUser);
router.delete(
  "/users/:id",
  authenticateToken,
  authenticateRole("superuser"),
  userController.deleteUser
);

router.post(
  "/news",
  authenticateToken,
  authenticateRole("admin", "superuser"),
  newsController.createNews
);
router.get("/news", newsController.getNews);
router.put(
  "/news/:id",
  authenticateToken,
  authenticateRole("admin", "superuser"),
  newsController.updateNews
);
router.delete(
  "/news/:id",
  authenticateToken,
  authenticateRole("admin", "superuser"),
  newsController.deleteNews
);
router.post(
  "/jobs",
  authenticateToken,
  authenticateRole("admin", "superuser"),
  jobController.createJob
);
router.get("/jobs", jobController.getJobs);
router.put(
  "/jobs/:id",
  authenticateToken,
  authenticateRole("admin", "superuser"),
  jobController.updateJob
);
router.delete(
  "/jobs/:id",
  authenticateToken,
  authenticateRole("admin", "superuser"),
  jobController.deleteJob
);

router.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  try {
    let subscriber = await UserSubscribe.findOne({ email });
    if (subscriber) {
      return res.status(400).send("Email is already subscribed.");
    }
    subscriber = new UserSubscribe({ email, isSubscribed: true });
    await subscriber.save();
    res.status(201).send("Subscription successful.");
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;

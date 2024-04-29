const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken.js");

const userController = require("../controllers/userController");
const newsController = require("../controllers/newsController");
const jobController = require("../controllers/jobController");
const { userValidationRules, validate } = require("../middleware/validation");

router.post(
  "/users",
  userValidationRules(),
  validate,
  userController.createUser
);
router.post("/login", userController.loginUser);
router.get("/users", authenticateToken, userController.getUsers);
router.put("/users/:id", authenticateToken, userController.updateUser);
router.delete("/users/:id", authenticateToken, userController.deleteUser);

router.post("/news", authenticateToken, newsController.createNews);
router.get("/news", newsController.getNews);
router.put("/news/:id", authenticateToken, newsController.updateNews);
router.delete("/news/:id", authenticateToken, newsController.deleteNews);

router.post("/jobs", authenticateToken, jobController.createJob);
router.get("/jobs", jobController.getJobs);
router.put("/jobs/:id", authenticateToken, jobController.updateJob);
router.delete("/jobs/:id", authenticateToken, jobController.deleteJob);

module.exports = router;

const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken.js");
const jobController = require("../controllers/jobController");

router.post("/jobs", authenticateToken, jobController.createJob);
router.get("/jobs", jobController.getJobs);
router.put("/jobs/:id", authenticateToken, jobController.updateJob);
router.delete("/jobs/:id", authenticateToken, jobController.deleteJob);

module.exports = router;

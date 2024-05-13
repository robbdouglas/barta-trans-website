const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken.js");
const newsController = require("../controllers/newsController");

router.post("/news", authenticateToken, newsController.createNews);
router.get("/news", newsController.getNews);
router.put("/news/:id", authenticateToken, newsController.updateNews);
router.delete("/news/:id", authenticateToken, newsController.deleteNews);

module.exports = router;

const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken.js");
const userController = require("../controllers/userController");
const { userValidationRules, validate } = require("../middleware/validation");

router.post("/users", userValidationRules(), validate, userController.createUser);
router.post("/login", userController.loginUser);
router.get("/users", authenticateToken, userController.getUsers);
router.put("/users/:id", authenticateToken, userController.updateUser);
router.delete("/users/:id", authenticateToken, userController.deleteUser);

module.exports = router;

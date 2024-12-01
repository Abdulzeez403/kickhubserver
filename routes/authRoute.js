const express = require("express");
const router = express.Router();
const {
  register,
  login,
  currentUser,
  updateUser,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// Auth routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/me", authMiddleware, currentUser);
router.put("/me", authMiddleware, updateUser);
module.exports = router;

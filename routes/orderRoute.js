// routes/orderRoutes.ts
const express = require("express");
const {
  createOrder,
  getOrderByUser,
  updateOrder,
  getOrders,
} = require("../controllers/orderController");
const protect = require("../middleware/authMiddleware"); // Authentication middleware

const router = express.Router();

router.post("/", protect, createOrder); // Create order
router.get("/:userId", protect, getOrderByUser); // Retrieve orders by user
router.get("/", protect, getOrders); // Retrieve orders by user
router.put("/:Id", protect, updateOrder); // Retrieve orders by user

module.exports = router;

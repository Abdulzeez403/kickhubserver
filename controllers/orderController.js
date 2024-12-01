const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");

const createOrder = asyncHandler(async (req, res) => {
  const newOrder = await Order.create({
    user: req.user._id, // User ID from authentication
    ...req.body,
  });

  res
    .status(201)
    .json({ message: "Order placed successfully", order: newOrder });
});

const getOrderByUser = asyncHandler(async (req, res) => {
  // Find all orders for a specific user
  const orders = await Order.find({ user: req.params.userId });

  // Check if there are no orders found
  if (!orders || orders.length === 0) {
    return res.status(404).json({ message: "No orders found for this user" });
  }

  // Populate the 'items' array with product details for each order
  const populatedOrders = await Promise.all(
    orders.map(async (order) => {
      await order.populate({
        path: "items._id", // Populate the product details in the items array
        model: "Product",
        select: "name description price", // Select only the needed fields from the Product model
      });
      return order; // Return the populated order
    })
  );

  // Return the populated orders
  res.json(populatedOrders);
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

const updateOrder = asyncHandler(async (req, res) => {
  const orders = await Order.findByIdAndUpdate(req.params._id, ...req.body, {
    new: true,
  });

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.json(orders);
});

module.exports = { createOrder, getOrderByUser, getOrders, updateOrder };

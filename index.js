const express = require("express");
const helmet = require("helmet");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/error");
const app = express();
const port = process.env.PORT || 3000;
const authRoutes = require("./routes/authRoute");
const logger = require("./middleware/logger");
const productRoutes = require("./routes/productRoute");
const orderRoutes = require("./routes/orderRoute");
const cors = require("cors");

// Middleware
app.use(helmet());
app.use(express.json());
app.use(errorHandler);
app.use(cors());
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});
app.use(express.json());

//route
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Start the server
connectDB();
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

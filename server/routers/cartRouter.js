const express = require("express");
const cartRouter = express.Router();

const { protect } = require("../middleware/auth"); // ✅ ONLY THIS
const { read, addToCart, syncCart } = require("../controllers/cartController");

cartRouter.get("/", protect, read);
cartRouter.post("/add", protect, addToCart);
cartRouter.post("/sync", protect, syncCart);

module.exports = cartRouter;
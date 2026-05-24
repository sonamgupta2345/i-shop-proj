
const orderRouter = require("express").Router();
const { createOrder, verifyPayment , getAllOrders, updateOrderStatus, getSingleOrder, cancelOrder, returnOrder, deleteOrder  } = require("../controllers/orderController");
const { protect, authorized } = require("../middleware/auth");

orderRouter.post("/create", protect, createOrder);
orderRouter.post("/verify", protect, verifyPayment);
orderRouter.get("/all",protect, authorized("admin", "superAdmin"), getAllOrders);
orderRouter.put("/status/:orderId", protect, authorized("admin", "superAdmin"), updateOrderStatus);
orderRouter.get("/:orderId",protect, getSingleOrder);
orderRouter.put( "/cancel/:orderId",protect,cancelOrder);
orderRouter.put("/return/:orderId",protect,returnOrder);
orderRouter.delete("/delete/:orderId",protect,deleteOrder);

module.exports = orderRouter;
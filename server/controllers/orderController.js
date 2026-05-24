const crypto = require("crypto");
const orderModel = require("../models/orderModel")
const cartModel = require("../models/cartModel")
const UserModel = require("../models/userModel")
const { sendSuccess, sendCreated, sendBadRequest, sendNotFound, sendConflict, sendServerError } = require("../utilts/response")
const Razorpay = require('razorpay');
var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


const createOrder = async (req, res) => {
  try {
    const { paymentMethod, address } = req.body;

    const userId = req.user._id;

    let userCart = await cartModel
      .findOne({ userId })
      .populate({
        path: "items.productId",
        select: "_id final_price",
      });

        // cart check
    if (!userCart || userCart.items.length === 0) {
      return sendBadRequest(res, "Cart is empty");
    }
           
      const productDetails = userCart.items.map((item)=>{
        const {_id, final_price} = item.productId
        return {
           product_id: _id,
           qty: item.qty,
           price: final_price,
           total: (final_price * item.qty )
         }
      });
    const total_Amount = productDetails.reduce(( sum, item) => sum + item.total, sum= 0)

    const order = await orderModel.create( {
        user: userId,
      items: productDetails,
      shippingAddress: address,
      paymentMethod: paymentMethod, // fixed
      totalAmount: total_Amount,
      paymentStatus: "pending",
      })
  if (paymentMethod === "cod") {
      return res.status(201).json({
        message: "Order placed successfully",
        success: true,
        orderId: order._id,
      });

      }else if(paymentMethod === "online"){
        const options = {
    amount: total_Amount * 100, // amount in paise = ₹500
    currency: "INR",
    receipt: "order._id",
  };
        instance.orders.create(options, function (err, razorpayorder){
          if(err){
            console.log(err) 
            return sendSuccess(res,"payment failed")
          }
            
            order.razorpay_order_id = razorpayorder.id;
            order.paymentMethod = "online"
           order.save()
          res.status(200).json({
            message:"order create successfully",
            success: true,
            orderId: order._id,
            payment_order_Id: razorpayorder.id,
          })
        }
    )
  }
    } catch (error) {
        console.log(error)
        return sendServerError(res)
    }
}


const verifyPayment = async (req, res) => {

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const order = await orderModel.findOne({ razorpay_order_id:  razorpay_order_id })

    console.log( razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature)
      

    // create generated signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    // verify signature
  if (expectedSignature === razorpay_signature) {

  order.razorpay_payment_id =
    razorpay_payment_id;

  order.paymentStatus = "paid";

  await order.save();

  return res.status(200).json({
    success: true,
    message: "Payment Verified Successfully"
  });

} else {

  return res.status(400).json({
    success: false,
    message: "Invalid Signature"
  });


    }
     } catch (error) {

    console.log(error);

    return sendServerError(res);

  }

};


const getAllOrders = async (req, res) => {

  try {

    const orders = await orderModel
      .find()
      .populate("user", "name email")
      .populate("items.product_id", "name price")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const updateOrderStatus = async (req, res) => {

  try {

    const { orderId } = req.params;

    const { orderStatus } = req.body;

    const validStatus = [
      "placed",
      "confirmed",
      "shipped",
      "out_for_delivery",
      "delivered",
      "cancelled",
      "return"
    ];

    // validate status
    if (!validStatus.includes(orderStatus)) {

      return res.status(400).json({
        success: false,
        message: "Invalid Order Status"
      });

    }

    // find order
    const order = await orderModel.findById(orderId);

    if (!order) {

      return res.status(404).json({
        success: false,
        message: "Order not found"
      });

    }

    // update status
    order.orderStatus = orderStatus;

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const getSingleOrder = async (req, res) => {

  try {

    const { orderId } = req.params;

    const order = await orderModel
      .findById(orderId)
      .populate("user", "name email")
      .populate(
        "items.product_id",
        "name thumbnail final_price"
      );

    if (!order) {

      return res.status(404).json({
        success: false,
        message: "Order not found"
      });

    }

    return res.status(200).json({
      success: true,
      order
    });

  } catch (error) {

    console.log(error);

    return sendServerError(res);

  }

};

const cancelOrder = async (req, res) => {

  try {

    const { orderId } = req.params;

    const order = await orderModel.findById(orderId);

    if (!order) {

      return res.status(404).json({
        success: false,
        message: "Order not found"
      });

    }

    order.orderStatus = "cancelled";

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully"
    });

  } catch (error) {

    console.log(error);

    return sendServerError(res);

  }

};

const returnOrder = async (req, res) => {

  try {

    const { orderId } = req.params;

    const order = await orderModel.findById(orderId);

    if (!order) {

      return res.status(404).json({
        success: false,
        message: "Order not found"
      });

    }

    order.orderStatus = "return";

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Return request submitted"
    });

  } catch (error) {

    console.log(error);

    return sendServerError(res);

  }

};


const deleteOrder = async (req, res) => {

  try {

    const { orderId } = req.params;

    const order = await orderModel.findById(orderId);

    if (!order) {

      return res.status(404).json({
        success: false,
        message: "Order not found"
      });

    }

    await order.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully"
    });

  } catch (error) {

    console.log(error);

    return sendServerError(res);

  }

};

const orderStats = async (req, res) => {

  try {

    const totalOrders =
      await orderModel.countDocuments();

    const deliveredOrders =
      await orderModel.countDocuments({
        orderStatus: "delivered"
      });

    const pendingOrders =
      await orderModel.countDocuments({
        orderStatus: "placed"
      });

    const totalSales =
      await orderModel.aggregate([
        {
          $match: {
            paymentStatus: "paid"
          }
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$totalAmount"
            }
          }
        }
      ]);

    return res.status(200).json({
      success: true,
      totalOrders,
      deliveredOrders,
      pendingOrders,
      totalSales:
        totalSales[0]?.total || 0
    });

  } catch (error) {

    console.log(error);

    return sendServerError(res);

  }

};

const getOrdersByStatus = async (req, res) => {

  try {

    const { status } = req.params;

    const orders = await orderModel
      .find({ orderStatus: status })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders
    });

  } catch (error) {

    console.log(error);

    return sendServerError(res);

  }

};


  
module.exports = {
    createOrder,  verifyPayment, getAllOrders, updateOrderStatus , getSingleOrder, returnOrder, deleteOrder, orderStats, getOrdersByStatus, cancelOrder
}
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define a schema for product details
const productDetailsSchema = new Schema({
    product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    total: { type: Number, required: true },
}, { _id: false });

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true
    },
    items: {
        type: [productDetailsSchema],
        required: true
    },
    shippingAddress: {
        fullName: {type: String, required: true},
        mobile: {type: String, required: true},
        pincode: {type: String, required: true},
        addressLine: {type: String, required: true},
        city: {type: String, required: true},
        state: {type: String, required: true},
    },

    paymentMethod: {
        type: String,
        enum: ["cod", "online"],
        required: true
    },

    paymentStatus: {
         type: String,
         enum: ["pending", "paid", "failed"],
         default: "pending"
    },

    orderSchema: {
        type: String,
        enum: [
            "placed",
            "confirmed",
            "shipped",
            "out_for_delivery",
            "delivered",
            "cancelled",
            "return"
        ],
        default: "placed"
    },

   totalAmount: {
    type: Number,
    required: true
   },
   razorpay_payment_id: {
    type: String,
    default: null
   },
    razorpay_order_id: {
    type: String,
    default: null
   },


   paidAt: Date,
   deliveredAt: Date,
},{
timestamps: true

})

module.exports = mongoose.model("order", orderSchema);

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6
    },

    phone: {
      type: String,
      default: null
    },

  

    role: {
      type: String,
      enum: ["user", "admin", "superAdmin"],
      default: "user"
    },

    addresses: [
        {
  fullName: { type: String, required: true },
  mobile: { type: String, required: true },
  pincode: { type: String, required: true },
  addressLine: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, default: "India" },
  is_default: { type: Boolean, default: false }
}
],
    isVerified: {
      type: Boolean,
      default: false
    },
    otp: {
        type:Number
    },
    otpExpire: {
       type:Date
    },
    status: {
       type: Boolean,
       default: true
    },

  },
  { timestamps: true }
);


const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
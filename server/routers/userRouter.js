const userRouter = require("express").Router();

const { 
  register, 
  verifyEmail, 
  resetOtp, 
  login, 
  getMe, 
  addAddress, 
  getAddress,
  deleteAddress,
  logout 
} = require("../controllers/userController");

const { protect } = require("../middleware/auth"); 

userRouter.post("/register", register);
userRouter.post("/verify-email", verifyEmail);
userRouter.post("/resend-otp", resetOtp);
userRouter.post("/login", login);

userRouter.get("/get", protect, getMe); 
userRouter.get("/logout", logout);
userRouter.post("/addAddress",protect, addAddress);
userRouter.get("/address", protect, getAddress);
userRouter.delete("/address/:index", protect, deleteAddress);


module.exports = userRouter;
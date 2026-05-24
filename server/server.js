require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const server = express();


server.use(express.json());
server.use(cookieParser());

server.use(cors({
  origin: true,
  credentials: true,
}));

server.use(express.static("./public"));


server.get("/", (req, res) => {
  res.send("API Running ");
});


server.use("/api/category", require("./routers/categoryRouter"));
server.use("/api/brand", require("./routers/brandRouter"));
server.use("/api/color", require("./routers/colorRouter"));
server.use("/api/product", require("./routers/productRouter"));
server.use("/api/user", require("./routers/userRouter"));
server.use("/api/cart", require("./routers/cartRouter")); 
server.use("/api/order", require("./routers/orderRouter"));


server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Database connected successfully");

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:");
    console.error(error);
  });

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:");
  console.error(err);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:");
  console.error(err);
});

n failed:", error.message);
  });

const productRouter = require("express").Router();
const fileUploader = require("express-fileupload");

const { create, read, readById, add_images, delete_image, deleteProduct } = require("../controllers/productController.js");

productRouter.post("/create", fileUploader({ createParentPath: true }), create);
productRouter.get("/", read);
productRouter.get("/:id", readById);
productRouter.put("/remove-image/:id", delete_image);
productRouter.delete("/delete/:id", deleteProduct);
productRouter.post("/add-images/:id", fileUploader({ createParentPath: true }), add_images);

module.exports = productRouter;
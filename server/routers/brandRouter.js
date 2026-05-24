const brandRouter = require("express").Router();
const fileUploader = require("express-fileupload")
const { create, read, update, statusUpdate, deleteById, readById } = require("../controllers/brandController");
brandRouter.post("/create", fileUploader({ createParentPath: true }), create);
brandRouter.get("/", read);
brandRouter.get("/:id", readById);
// categoryRouter.get("/category/:slug", readById);
brandRouter.patch("/status-update/:id", statusUpdate);
brandRouter.delete("/delete/:id", deleteById);
brandRouter.put("/update/:id", fileUploader({ createParentPath: true }), update)

module.exports = brandRouter;

const colorRouter = require("express").Router();
const { create, read, update, statusUpdate, deleteById, readById } = require("../controllers/colorController");


colorRouter.post("/create", create);
colorRouter.get("/", read);
colorRouter.get("/:id", readById);
colorRouter.patch("/status-update/:id", statusUpdate);
colorRouter.delete("/delete/:id", deleteById);
colorRouter.put("/update/:id", update)

module.exports = colorRouter;
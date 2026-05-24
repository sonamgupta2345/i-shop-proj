const { sendServerError } = require("../utilts/response");
const cartModel = require("../models/cartModel");

const syncCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const localCart = Array.isArray(req.body.localCart)
            ? req.body.localCart
            : JSON.parse(req.body.localCart || "[]");
        // ✅ If local cart is empty → return server cart
        if (localCart.length === 0) {
            const userCart = await cartModel.findOne({ userId }).populate({
                path: "items.productId",
                select:
                    "name _id original_price final_price discount_percentage price thumbnail stock",
            });

            return res.status(200).json({
                message: "Fetched cart from server",
                success: true,
                cart: userCart ? userCart.items : [],
                imageBaseUrl: "http://localhost:5000/api/category",
            });
        }

        // ✅ Get user cart
        let userCart = await cartModel.findOne({ userId }).populate({
            path: "items.productId",
            select:
                "name _id original_price final_price discount_percentage price thumbnail",
        });

        // ✅ Create cart if not exists
        if (!userCart) {
            userCart = new cartModel({
                userId,
                items: [],
            });
        }

        // ✅ Merge local cart into DB
        localCart.forEach((cartItem) => {
            const { id, qty } = cartItem;

            const existingItem = userCart.items.find(
                (item) =>
                    item.productId &&
                    item.productId._id.toString() === id
            );

            if (existingItem) {
                existingItem.qty += Number(qty);
            } else {
                userCart.items.push({
                    productId: id,
                    qty: Number(qty),
                });
            }
        });

        // ✅ Save cart
        await userCart.save();

        // ✅ Send response
        res.status(200).json({
            message: "Cart synced successfully",
            success: true,
            cart: userCart.items,
        });

    } catch (error) {
        console.log(error);
        sendServerError(res, error);
    }
};

const addToCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id, qty } = req.body;

        let userCart = await cartModel.findOne({ userId }).populate({
            path: "items.productId",
            select:
                "name _id original_price final_price discount_percentage price thumbnail",
        });

        // ✅ Create cart if not exists
        if (!userCart) {
            userCart = new cartModel({
                userId,
                items: [],
            });
        }

        const existingItem = userCart.items.find(
            (item) =>
                item.productId &&
                item.productId._id.toString() === id
        );

        if (existingItem) {
            existingItem.qty += qty;
        } else {
            userCart.items.push({
                productId: id,
                qty,
            });
        }

        await userCart.save();

        res.status(200).json({
            message: "Item added to cart",
            success: true,
            cart: userCart.items
        });

    } catch (error) {
        console.log(error);
        sendServerError(res, error);
    }
};

const read = async (req, res) => {
    try {
        const userId = req.user._id;

        const userCart = await cartModel.findOne({ userId }).populate({
            path: "items.productId",
            select:
                "name _id original_price final_price discount_percentage price thumbnail stock",
        });

        res.status(200).json({
            success: true,
            message: "Cart fetched successfully",
            cart: userCart ? userCart.items : [],
            imageBaseUrl: "http://localhost:5000/api/category",
        });

    } catch (error) {
        console.log(error);
        sendServerError(res, error);
    }
};

module.exports = {
    syncCart,
    addToCart,
    read
};
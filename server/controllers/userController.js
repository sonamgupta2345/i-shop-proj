const { sendSuccess, sendCreated, sendBadRequest, sendNotFound, sendConflict, sendServerError } = require("../utilts/response");
const sendOtpMail = require("../utilts/sendOtpMail")
const userModel = require("../models/userModel");
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SECRET_KEY);
const { createUniqueName } = require("../utilts/helper");
const generateToken = require("../utilts/generateToken");
const { response } = require("express");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return sendBadRequest(res, "name, email and password are required");
        }

        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return sendConflict(res, "user with this email already exists");
        }
        const encryptedPassword = cryptr.encrypt(password);
        const otp = Math.floor(100000 + Math.random() * 900000)
        const user = await userModel.create({
            name,
            email,
            password: encryptedPassword,
            otp: otp,
            otpExpire: Date.now() + 3 * 60 * 1000
        })

        const mailResponse = await sendOtpMail(email, otp);
        console.log(mailResponse)

        return sendCreated(res, "user registered successfully", { id: user._id, name: user.name, email: user.email });
    } catch (error) {
        return sendServerError(res, error);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return sendBadRequest(res, "name, email and password are required");
        }
        const user = await userModel.findOne({ email });
        if (!user || user.isVerified === false) {
            return sendNotFound(res, "user not found");
        }
        const decryptedPass = cryptr.decrypt(user.password);
        if (decryptedPass !== password) {
            return sendBadRequest(res, "wrong password")
        }

        const token = generateToken(user._id)

        res.cookie('token', token, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        });



        return sendSuccess(res, "user login successfully", { id: user._id, name: user.name, email: user.email });
    } catch (error) {
        console.log(error)
        return sendServerError(res, error);
    }
};

const verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return sendNotFound(res, "user not found");
        }
        if (user.isVerified) {
            return sendBadRequest(res, "Email is already verified");
        }
        if (user.otp !== parseInt(otp)) {
            return sendBadRequest(res, "Invalid OTP");
        }
        if (user.otpExpire < Date.now()) {
            return sendBadRequest(res, "OTP has expired");
        }
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpire = undefined
        await user.save();
        return sendSuccess(res, "Email verified Successfully")
    }
    catch (error) {
        return sendServerError(res, error)
    }
}

const resetOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return sendNotFound(res, "user not found");
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        user.otp = otp;
        user.otpExpire = Date.now() + 3 * 60 * 1000;
        await user.save()
        const mailResponse = await sendOtpMail(email, otp);
        console.log(mailResponse)
        return sendSuccess(res, "OTP reset successfully");
    } catch (error) {
        return sendServerError(res, error);
    }
}

const logout = async (req, res) => {
    try {
       res.clearCookie('token');
        res.sendSuccess(res)
    } catch (error) {
        return sendServerError(res, error);
    }
}

const getMe = async (req, res) => {
    try {
        res.status(200).json({
            message: "User Find",
            success: true,
            user: req.user
        })

    } catch (error) {
        return sendServerError(res, error);
    }
}


const addAddress = async (req, res) => {
    try {

        const userId = req.user._id;

        const user = await userModel.findById(userId);

        user.addresses.push(req.body);

        await user.save();

        res.json({
            success: true,
            addresses: user.addresses
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getAddress = async (req, res) => {
    try {

        const user = await userModel.findById(req.user._id);

        res.json({
            success: true,
            addresses: user.addresses
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteAddress = async (req, res) => {
    try {

        const index = req.params.index;

        const user = await userModel.findById(req.user._id);

        user.addresses.splice(index, 1);

        await user.save();

        res.json({
            success: true,
            addresses: user.addresses
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
module.exports = {
    register, verifyEmail, resetOtp, login, getMe, logout, addAddress, getAddress, deleteAddress
}
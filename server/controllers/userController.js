import User from "../models/User.js";
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";


export const changePassword = async (req, res) => {

    try {

        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {

            return res.status(400).json({
                message: "Current password and new password are required"
            });

        }

        const user = await User.findById(req.user._id);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        const isMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isMatch) {

            return res.status(400).json({
                message: "Current password is incorrect"
            });

        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        await user.save();

        res.status(200).json({

            success: true,

            message: "Password changed successfully"

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


export const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser && existingUser._id.toString() !== user._id.toString()) {
            return res.status(400).json({ message: "Email already exists" });
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        await user.save();

        res.status(200).json({

            success: true,

            message: "Profile updated successfully",

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                role: user.role
            }

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


export const getProfile = async (req, res) => {

    res.status(200).json({

        success: true,

        user: req.user

    });

};


export const uploadAvatar = async (req, res) => {

      console.log("uploadAvatar controller reached");

    try {

        if (!req.file) {

            return res.status(400).json({

                message: "Please upload an image"

            });

        }

        const base64Image =
            `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

        const result = await cloudinary.uploader.upload(base64Image, {

            folder: "movie-app/avatars"

        });

        const user = await User.findById(req.user._id);

        user.avatar = result.secure_url;

        await user.save();

        res.status(200).json({

            success: true,

            message: "Avatar uploaded successfully",

            avatar: user.avatar

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};
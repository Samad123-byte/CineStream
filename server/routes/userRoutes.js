import express from "express";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {
    getProfile,
    updateProfile,
    changePassword,
    uploadAvatar
} from "../controllers/userController.js";

const router = express.Router();

// Get Profile
router.get("/profile", protect, getProfile);

// Update Profile
router.put("/profile", protect, updateProfile);

// Change Password
router.put("/change-password", protect, changePassword);

router.put(
    "/avatar",
    protect,
    upload.single("avatar"),
    uploadAvatar
);

export default router;
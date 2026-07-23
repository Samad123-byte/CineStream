import express from "express";

import protect from "../middleware/authMiddleware.js";

import {

addReview,

getReviews,

deleteReview

} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", protect, addReview);

router.get("/:movieId", getReviews);

router.delete("/:movieId", protect, deleteReview);

export default router;
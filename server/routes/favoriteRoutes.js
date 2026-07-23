import express from "express";

import protect from "../middleware/authMiddleware.js";

import {

addFavorite,

getFavorites,

deleteFavorite

} from "../controllers/favoriteController.js";

const router = express.Router();

router.post("/", protect, addFavorite);

router.get("/", protect, getFavorites);

router.delete("/:movieId", protect, deleteFavorite);

export default router;
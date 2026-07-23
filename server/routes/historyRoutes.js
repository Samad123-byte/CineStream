import express from "express";

import protect from "../middleware/authMiddleware.js";

import {

    addHistory,

    getHistory,

    deleteHistory

} from "../controllers/historyController.js";

const router = express.Router();

router.post("/", protect, addHistory);

router.get("/", protect, getHistory);

router.delete("/:movieId", protect, deleteHistory);

export default router;
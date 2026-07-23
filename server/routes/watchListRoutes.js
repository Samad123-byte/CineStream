import express from "express"
import protect from "../middleware/authMiddleware.js";


import {

    addWatchList,
    getWatchList,
    deleteWatchList

} from "../controllers/watchListController.js";

const router = express.Router();

router.post("/", protect, addWatchList);

router.get("/", protect, getWatchList);

router.delete("/:movieId", protect, deleteWatchList);

export default router;
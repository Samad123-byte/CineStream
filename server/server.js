import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectdb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import favoriteRoutes from "./routes/favoriteRoutes.js";
import watchListRoutes from "./routes/watchListRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();

connectdb();

const app = express();

// Middleware
app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://cine-stream-pi-two.vercel.app"
    ],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/favorites", favoriteRoutes);
app.use("/api/watchlist", watchListRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/reviews", reviewRoutes);



// Test Route
app.get("/", (req, res) => {
    res.json({
        message: "CineStream Backend Running 🚀",
    });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
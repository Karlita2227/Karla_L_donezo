import express from "express";
import cors from "cors";
import todoRouter from "./routes/todo.js";
import verifyToken from "./middleware/auth.js";

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/todos", verifyToken, todoRouter);

// Single app.listen block with error handling
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
}).on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use. Try a different port.`);
  } else {
    console.error("❌ Server error:", err);
  }
});

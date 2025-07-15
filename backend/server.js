import express from "express";
import cors from "cors";
import todoRouter from "./routes/todo.js";
import verifyToken from "./middleware/auth.js";

const app = express();
const PORT = process.env.PORT || 8081;


app.use(cors());
app.use(express.json());
app.use("/todos", verifyToken, todoRouter);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Try a different port.`);
  } else {
    console.error('Server error:', err);
  }
});

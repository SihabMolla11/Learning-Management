import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";
import router from "./routes/main.route";

dotenv.config();
connectDB();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/v1", router);
app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

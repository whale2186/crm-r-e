import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import customersRouter from "./routes/customers.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

app.use("/api/customers", customersRouter);

app.get("/", (req, res) => res.json({ status: "OK" }));

app.listen(PORT, ()=> console.log(`Server listening ${PORT}`));

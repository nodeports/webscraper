// src/app.ts
import express from "express";
import mongoose from "mongoose";
import scraperRouter from "./routes/scraper";

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost:27017/webscraper", {});

app.use(express.json());
app.use("/api", scraperRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

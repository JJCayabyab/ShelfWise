import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import bookRoutes from "./routes/bookRoutes.js";
import { sql } from "./config/db.js";
import rateLimit from "express-rate-limit";
dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // to parse json body
app.use(helmet()); // Security middleware
app.use(morgan("dev")); // log the request
app.use(cors()); // to allow cross-origin requests

// basic rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150, 
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: "false",
    message: "Too many requests, please try again later.",
  },
});

app.use(limiter); // apply limiter to all routes
app.use("/api/books", bookRoutes);

async function startServer() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS books(
         id SERIAL PRIMARY KEY,
         title VARCHAR(255) NOT NULL,
         author VARCHAR(255) NOT NULL,
         year_published INT NOT NULL,
         img TEXT,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`;

    //start  server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();

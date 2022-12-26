import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";
import path from "path";
const app = express();
dotenv.config();

app.use(express.json());

// app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mp", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/users", userRoutes);

/* -------------------------------------------------------------------------- */
// serving the frontend

app.use(express.static(path.dirname("./client/build")));

app.get("*", (_, res) => {
  res.sendFile(path.resolve("./client/build/index.html")),
    (err) => {
      res.status(500).send(err.message);
    };
});

/* -------------------------------------------------------------------------- */
const PORT = process.env.PORT || 8080;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
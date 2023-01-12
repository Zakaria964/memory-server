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
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(
  cors({
    origin: ["http://localhost:3000", "https://luxury-toffee-c013f7.netlify.app/"],
  })
);

app.use("/posts", postRoutes);
app.use("/users", userRoutes);

/* -------------------------------------------------------------------------- */
// serving the frontend


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

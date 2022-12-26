import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  likePost,
  deletePost,
} from "../controllers/posts.js";
const router = express.Router();
// import auth from "../middleware/auth.js";

router.get("/:id", getPost);
router.get("/", getPosts);
router.post("/", createPost);

router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/likePosts", likePost);

export default router;

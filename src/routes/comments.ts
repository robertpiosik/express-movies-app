import { Router } from "express";
import * as commentsController from "../controllers/comments";
import checkAuth from "../middleware/check-auth";

const router = Router();

router.post("/comments", checkAuth, commentsController.postComments);

export default router;

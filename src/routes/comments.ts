import { Router } from "express";

import * as commentsController from "../controllers/comments";
import checkAuth from "../middleware/check-auth";

const router = Router();

router.post("/comments", checkAuth, commentsController.postComments);
router.get("/comments", commentsController.getComments);

export default router;

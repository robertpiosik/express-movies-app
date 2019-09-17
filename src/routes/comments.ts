import { Router } from "express";
import { body } from "express-validator";

import * as commentsController from "../controllers/comments";
import checkAuth from "../middleware/check-auth";

const router = Router();

router.post(
	"/comments",
	checkAuth,
	[
		body("content", "Missing content.")
			.not()
			.isEmpty(),
		body("movieId", "Missing movieId.")
			.not()
			.isEmpty()
	],
	commentsController.postComments
);
router.get("/comments", commentsController.getComments);

export default router;

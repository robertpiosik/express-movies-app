import { Router } from "express";
import { body } from "express-validator";

import checkAuth from "../middleware/check-auth";
import * as moviesController from "../controllers/movies";

const router = Router();

router.get("/movies", moviesController.getMovies);
router.post(
	"/movies",
	checkAuth,
	body("title", "Missing title.")
		.not()
		.isEmpty(),
	moviesController.postMovies
);

export default router;

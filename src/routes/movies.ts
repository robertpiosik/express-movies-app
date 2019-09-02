import { Router } from "express";

import checkAuth from "../middleware/check-auth";
import * as moviesController from "../controllers/movies";

const router = Router();

router.get("/movies", moviesController.getMovies);
router.post("/movies", checkAuth, moviesController.postMovies);

export default router;

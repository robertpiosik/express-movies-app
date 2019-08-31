import { Router } from "express";
const router = Router();

import checkAuth from "../middleware/check-auth";
import * as moviesController from "../controllers/movies";

router.post("/movies", checkAuth, moviesController.postMovies);

export default router;

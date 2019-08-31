import { Router } from "express";
const router = Router();

import isAuth from "../middleware/is-auth";
import * as moviesController from "../controllers/movies";

router.post("/movies", isAuth, moviesController.postMovies);

export default router;

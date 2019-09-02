import { Router } from "express";

import * as authController from "../controllers/auth";

const router = Router();

router.post("/auth/signup", authController.signup);
router.post("/auth/login", authController.login);

export default router;

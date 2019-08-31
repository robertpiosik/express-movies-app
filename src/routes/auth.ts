import { Router } from "express";
const router = Router();

import * as authController from "../controllers/auth";

router.post("/auth/signup", authController.signup);
router.post("/auth/login", authController.login);

export default router;

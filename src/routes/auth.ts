import { Router } from "express";
import { body } from "express-validator";

import * as authController from "../controllers/auth";

const router = Router();

router.post(
	"/auth/signup",
	[
		body("email", "Please enter a valid email.").isEmail().normalizeEmail(),
		body(
			"password",
			"Please enter a password that has 8 characters or more."
		).isLength({ min: 8 })
	],
	authController.signup
);
router.post("/auth/login", authController.login);

export default router;

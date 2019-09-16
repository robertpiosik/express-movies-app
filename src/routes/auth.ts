import { Router } from "express";
import { body } from "express-validator";

import * as authController from "../controllers/auth";
import User from "../models/user";

const router = Router();

router.post(
	"/auth/signup",
	[
		body("email", "Please enter a valid email.")
			.isEmail()
			.custom(email => {
				return User.findOne({ email }).then(userDoc => {
					if (userDoc) {
						return Promise.reject(
							"Email already exists, please pick a different one."
						);
					}
				});
			})
			.normalizeEmail(),
		body("password", "Please enter a password that has 8 characters or more.")
			.isLength({ min: 8 })
			.trim()
	],
	authController.signup
);

router.post(
	"/auth/login",
	[
		body("email", "Please enter a valid email.")
			.isEmail()
			.normalizeEmail(),
		body("password", "Please enter a password.")
			.not()
			.isEmpty()
	],
	authController.login
);

router.post("/auth/refresh-token",authController.refreshToken)

export default router;

import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import User from "../models/user";

export const signup = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, password } = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return next({
			status: 422,
			name: "SignupErrors",
			message: "Signup errors occured.",
			data: errors.array()
		});
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	const newUser = await new User({
		email,
		password: hashedPassword
	}).save();
	res.status(201).json({
		name: "Success",
		message: "User registered successfully.",
		data: { id: newUser._id.toString() }
	});
};

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, password } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next({
			status: 422,
			name: "LoginErrors",
			message: "Login errors occured.",
			data: errors.array()
		});
	}

	try {
		const user = await User.findOne({ email });
		if (user) {
			if (await bcrypt.compare(password, user.password)) {
				const token = await jwt.sign(
					{ userId: user._id },
					process.env.JWT_PRIVATE_KEY,
					{ expiresIn: "2d" }
				);
				const expiresAt = Math.floor(Date.now() / 1000 + 172800);
				res.status(200).json({
					name: "Success",
					message: "User authenticated successfully.",
					data: {
						token,
						expiresAt
					}
				});
			} else {
				next({
					status: 401,
					name: "InvalidCredentials",
					message: "Invalid email or password."
				});
			}
		} else {
			next({
				status: 401,
				name: "InvalidCredentials",
				message: "Invalid email or password."
			});
		}
	} catch (err) {
		console.log(err);
	}
};

export const refreshToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.isAuth) {
		return next({
			status: 401,
			name: "NotAuthorized",
			message: "You are not authorized."
		});
	}
	try {
		const token = await jwt.sign(
			{ userId: req.userId },
			process.env.JWT_PRIVATE_KEY,
			{ expiresIn: "2d" }
		);
		const expiresAt = Math.floor(Date.now() / 1000 + 172800);
		res.status(200).json({
			name: "Success",
			message: "Token prolonged successfully.",
			data: {
				token,
				expiresAt
			}
		});
	} catch (err) {
		console.log(err);
	}
};

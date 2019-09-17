import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import User from "../models/user";

interface ResponseError extends Error {
	status?: number;
	data?: any;
}

export const signup = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, password } = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const error: ResponseError = new Error("Validation failed.");
		error.status = 422;
		error.data = errors.array();
		return next(error);
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
		const error: ResponseError = new Error("Validation failed.");
		error.status = 422;
		error.data = errors.array();
		return next(error);
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
				const error: ResponseError = new Error("Invalid credentials.");
				error.status = 401;
				next(error);
			}
		} else {
			const error: ResponseError = new Error("Invalid credentials.");
			error.status = 401;
			next(error);
		}
	} catch (err) {
		const error: ResponseError = new Error("DB Error.");
		error.data = err;
		next(err);
	}
};

export const refreshToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.isAuth) {
		const error: ResponseError = new Error("Not authorized.");
		error.status = 401;
		return next(error);
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
		const error: ResponseError = new Error("Error during signing a token.");
		error.data = err;
		next(error);
	}
};

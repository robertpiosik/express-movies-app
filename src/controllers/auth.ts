import { Request, Response, NextFunction } from "express";
import validator from "validator";
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

	const user = await User.findOne({ email });
	if (!user) {
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
	} else {
		next({
			status: 400,
			name: "AlreadyRegistered",
			message: "Email already registered."
		});
	}
};

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next({
			status: 422,
			name: "MissingAuthData",
			message: "Email or password is missing."
		});
	}

	if (!validator.isEmail(email)) {
		return next({
			status: 422,
			name: "InvalidEmail",
			message: "Email is invalid."
		});
	}

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
			return next({
				status: 401,
				name: "PasswordMismatch",
				message: "Provided password is incorrect."
			});
		}
	} else {
		return next({
			status: 404,
			name: "UserNotFound",
			message: "Provided e-mail is not registered yet."
		});
	}
};

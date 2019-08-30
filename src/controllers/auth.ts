import { Request, Response, NextFunction } from "express";
import validator from "validator";
import bcrypt from "bcryptjs";

import { User, UserDocument } from "../models/user";

export const signup = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, password }: { email: string; password: string } = req.body;

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
			message: "Provided E-mail address is invalid."
		});
	}

	if (password.length < 8) {
		return next({
			status: 422,
			name: "TooShortPassword",
			message: "Provided password is too short."
		});
	}

	try {
		const user = await User.findOne({ email });
		if (!user) {
			const hashedPassword: string = await bcrypt.hash(password, 10);
			const newUser = new User({
				email,
				password: hashedPassword
			});
			await newUser.save();
			next({
				status: 201,
				name: "Success",
				message: "User account registered successfully.",
				data: {id: newUser._id.toString()}
			});
		} else {
			next({
				status: 422,
				name: "AlreadyRegistered",
				message: "Account with this e-mail address is already registered."
			});
		}
	} catch (error) {
		next({ data: error });
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
	res.sendStatus(200);
};

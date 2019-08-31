import { Request, Response, NextFunction } from "express";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user";

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


	
};

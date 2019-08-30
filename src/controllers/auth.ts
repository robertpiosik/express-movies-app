import { Request, Response, NextFunction } from "express";

export const signup = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.send("wip");
};

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, password } = req.body;

	if (!email || !password)
		return next({
			status: 422,
			name: "MissingAuthData",
			message: "Email or password is missing."
		});

	res.send("wip");
};

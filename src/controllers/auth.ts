import { Request, Response, NextFunction } from "express";

export const signup = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next({
			status: 422,
			name: "MissingAuthData",
			message: "Email or password is missing"
		});
	}
	res.sendStatus(200);

	// validate email and password
	// check if user is not registered, if yes throw
	// process password with bcrypt
	// put user into db
	// return success
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

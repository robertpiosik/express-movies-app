import { Request, Response, NextFunction } from "express";

export const getMovies = (req: Request, res: Response, next: NextFunction) => {
	res.sendStatus(200);
};

export const postMovies = (req: Request, res: Response, next: NextFunction) => {
	if (!req.isAuth) {
		return next({
			status: 401,
			name: "NotAuthorized",
			message: "Authorization header was not found."
		});
	}

	const { title } = req.body;
	if (!title) {
		return next({
			status: 422,
			name: "MissingTitle",
			message: "Title is missing."
		});
	}
	res.send(200);
};

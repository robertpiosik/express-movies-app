import { Request, Response, NextFunction } from "express";

export const postMovies = (req: Request, res: Response, next: NextFunction) => {
	if (!req.isAuth) {
		return next({
			status: 422,
			name: "NoAuthorizationHeader",
			message: "Authorization header was not found."
		});
	}
};

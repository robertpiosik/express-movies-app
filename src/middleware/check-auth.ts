import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface ResponseError extends Error {
	status?: number;
	data?: any;
}

export default async (req: Request, res: Response, next: NextFunction) => {
	const authorizationHeader = req.get("Authorization");

	if (!authorizationHeader) {
		const error: ResponseError = new Error("Not authorized.");
		error.status = 401;
		return next(error);
	}

	const token = authorizationHeader.split(" ")[1];
	try {
		const decodedToken: any = await jwt.verify(
			token,
			process.env.JWT_PRIVATE_KEY
		);
		req.isAuth = true;
		req.userId = decodedToken.userId;
		next();
	} catch (err) {
		const error: ResponseError = new Error("Not authorized.");
		error.status = 401;
		error.data = err;
		return next(error);
	}
};

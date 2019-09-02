import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default async (req: Request, res: Response, next: NextFunction) => {
	const authorizationHeader = req.get("Authorization");

	if (!authorizationHeader) {
		req.isAuth = false;
		return next();
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
		req.isAuth = false;
		next();
	}
};

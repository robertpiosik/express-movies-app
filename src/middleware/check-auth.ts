import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default async (req: Request, res: Response, next: NextFunction) => {
	const authorizationHeader = req.get("Authorization");
	let isAuth: boolean;
	let userId: string;

	if (!authorizationHeader) {
		isAuth = false;
		req.isAuth = isAuth;
		return next();
	}

	const token = authorizationHeader.split(" ")[1];
	const jwtPrivateKey: string = process.env.JWT_PRIVATE_KEY;
	try {
		const decodedToken: any = await jwt.verify(token, jwtPrivateKey);
		isAuth = true;
		userId = decodedToken.userId;
		req.isAuth = isAuth;
		req.userId = userId;
		next();
	} catch (err) {
		isAuth = false;
		req.isAuth = isAuth;
		return next();
	}
};

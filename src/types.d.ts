// Imports something to be treated as module
import * as ts from "typescript";

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "production";
			PORT: string;
			DATABASE_CONNECTION: string;
			JWT_PRIVATE_KEY: string;
			OMDB_API_KEY: string;
		}
	}
}

declare module "express" {
	interface Request {
		isAuth?: boolean;
		userId?: string;
	}
	interface ErrorRequestHandler {
		status?: number;
		message?: string; 
		data?: any;
	}
}

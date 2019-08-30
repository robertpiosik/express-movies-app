// Imports something to be treated as module 
import * as ts from "typescript";

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "production";
			PORT: string;
			DBATABASE_CONNECTION: string;
			JWT_PRIVATE_KEY: string;
		}
	}
	namespace Express {
		interface Request {
			isAuth: boolean;
			userId: string;
		}
	}
}

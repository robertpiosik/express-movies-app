import express, {
	Application,
	Request,
	Response,
	ErrorRequestHandler
} from "express";
import helmet from "helmet";
import cors from "cors";
import responseTime from "response-time";
// import graphqlHttp from "express-graphql";

import checkAuth from "./middleware/check-auth";
// import graphqlSchema from "./graphql/schema";
// import graphqlResolvers from "./graphql/resolvers";

import authRoutes from "./routes/auth";
import { NextFunction } from "connect";

const app: Application = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(responseTime());

// Am I alive?
app.get("/", (req, res, next) => {
	res.sendStatus(200);
});

// Check authorization header
app.use(checkAuth);

// REST routes
app.use("/api/v1", authRoutes);

// graphQL route
// app.use(
// 	"/graphql",
// 	graphqlHttp({
// 		schema: graphqlSchema,
// 		rootValue: graphqlResolvers,
// 		graphiql: process.env.NODE_ENV === "development" ? true : false,
// 		customFormatErrorFn(error) {
// 			if (!error.originalError) return error;

// 			const data = error.originalError.data;
// 			const message = error.message || "An error occured";
// 			const status = error.originalError.status || 500;
// 			return { message, status, data };
// 		}
// 	})
// );

// prettier-ignore

// Error handling
app.use((error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
	const status = error.status || 500;
	const name = error.name || "ServerError";
	const message = error.message || "";
	const data = error.data;
	res.status(status).json({ status, name, message, data });
});

export default app;

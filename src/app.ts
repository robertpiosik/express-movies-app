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

const app: Application = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(responseTime());

app.use(checkAuth);

app.use(authRoutes);

app.get("/", (req, res, next) => {
	const x:string = 's';
	const c = 'ss';
	res.send("okk2");
});

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

interface ErrorRequestHandlerExtended extends ErrorRequestHandler {
	status: number;
	data: any;
}

// Error handling
app.use((error: ErrorRequestHandlerExtended, req: Request, res: Response) => {
	console.log(error);
	const status = error.status || 500;
	const name = error.name || "ServerError";
	const data = error.data;
	res.status(status).json({ status, name, data });
});

export default app;

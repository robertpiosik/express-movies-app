import express, {
	Application,
	Request,
	Response,
	ErrorRequestHandler,
	NextFunction
} from "express";
import helmet from "helmet";
import cors from "cors";
import responseTime from "response-time";

import checkAuth from "./middleware/check-auth";

import authRoutes from "./routes/auth";
import moviesRoutes from "./routes/movies";
import commentsRoutes from "./routes/comments";

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
app.use("/api/v1", moviesRoutes);
app.use("/api/v1", commentsRoutes);

// prettier-ignore

// Error handling
app.use((error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
	const status = error.status || 500;
	const name = error.name || "ServerError";
	const message = error.message || "";
	const data = error.data;
	res.status(status).json({ name, message, data });
});

export default app;

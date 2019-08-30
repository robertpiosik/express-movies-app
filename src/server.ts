require("dotenv").config();
import mongoose from "mongoose";

import app from "./app";

mongoose
	.connect(
		`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER}/${process.env.DB_NAME}?authSource=admin`,
		{ useNewUrlParser: true, useCreateIndex: true }
	)
	.catch(err => {
		console.log(err);
	});

const port: string = process.env.PORT;
const nodeEnv: string = process.env.NODE_ENV;
const server = app.listen(port, () => {
	console.log(
		"Server is running at http://localhost:%d in %s mode",
		port,
		nodeEnv
	);
});

export default server;

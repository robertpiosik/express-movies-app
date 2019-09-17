require("dotenv").config();
import mongoose from "mongoose";

import app from "./app";

mongoose
	.connect(
		`${process.env.DATABASE_CONNECTION}`,
		{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
	)
	.catch(err => {
		console.log(err);
	});

const port = process.env.PORT;
const nodeEnv = process.env.NODE_ENV;
const server = app.listen(port, () => {
	console.log(
		"Server is running at http://localhost:%d in %s mode",
		port,
		nodeEnv
	);
});

export default server;
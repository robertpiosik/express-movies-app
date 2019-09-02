require("dotenv").config();
import request, { Response } from "supertest";
import jwt from "jsonwebtoken";
import mockingoose from "mockingoose";
import app from "../app";

import Comment from "../models/comment";

describe("POST /api/v1/comments", () => {
	it("should return 401 if user is not authenticated", () => {
		return request(app)
			.post("/api/v1/comments")
			.expect((res: Response) => {
				expect(res.status).toBe(401);
			});
	});

	it("should not return 401 if user is authenticated", async () => {
		const token = await jwt.sign(
			{ userId: "123" },
			process.env.JWT_PRIVATE_KEY
		);

		return request(app)
			.post("/api/v1/comments")
			.set("Authorization", `Bearer ${token}`)
			.expect((res: Response) => {
				expect(res.status).not.toBe(401);
			});
	});

	it("should return 422 if no content or movieId is provied", async () => {
		const token = await jwt.sign(
			{ userId: "123" },
			process.env.JWT_PRIVATE_KEY
		);

		return request(app)
			.post("/api/v1/comments")
			.set("Authorization", `Bearer ${token}`)
			.expect((res: Response) => {
				expect(res.status).toBe(422);
			});
	});
});

describe("GET /api/v1/comments", () => {
	it("should respond with 200", () => {
		return request(app)
			.get("/api/v1/comments")
			.expect((res: Response) => {
				expect(res.status).toBe(200);
			});
	});

	it("should return comment documents and total comments", () => {
		const _doc = [{ content: "Ipsum ipsum" }, { content: "Lorem lorem" }];
		mockingoose(Comment).toReturn(2, "countDocuments");
		mockingoose(Comment).toReturn(_doc, "find");
		return request(app)
			.get("/api/v1/comments")
			.expect((res: Response) => {
				expect(res.body.data.comments[0].content).toBe("Ipsum ipsum");
				expect(res.body.data.comments[1].content).toBe("Lorem lorem");
				expect(res.body.data.total).toBe(2);
			});
	});
});

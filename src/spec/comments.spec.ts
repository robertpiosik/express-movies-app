require("dotenv").config();
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app";

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
});

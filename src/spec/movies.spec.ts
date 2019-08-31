require("dotenv").config();
import request, { Response } from "supertest";
import mockingoose from "mockingoose";
import jwt from "jsonwebtoken";
import app from "../app";
import User from "../models/user";

describe("GET /api/v1/movies", () => {
	it("should return 200", () => {
		return request(app)
			.get("/api/v1/movies")
			.expect((res: Response) => {
				expect(res.status).toBe(200);
			});
	});
});

describe("POST /api/v1/movies", () => {
	it("should return 401 if no Authorization header is present", () => {
		return request(app)
			.post("/api/v1/movies")
			.expect((res: Response) => {
				expect(res.status).toBe(401);
			});
	});

	it("should NOT return 401 if user is authorized", async () => {
		const token = await jwt.sign(
			{ id: "5d69b6110c88517530d0b246" },
			process.env.JWT_PRIVATE_KEY,
			{ expiresIn: "2d" }
		);

		return request(app)
			.post("/api/v1/movies")
			.set("Authorization", `Bearer ${token}`)
			.expect((res: Response) => {
				expect(res.status).not.toBe(401);
			});

	});
});

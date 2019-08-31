require("dotenv").config();
import jwt from "jsonwebtoken";
import request, { Response } from "supertest";
import app from "../app";

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
		const token = await jwt.sign({ id: "123" }, process.env.JWT_PRIVATE_KEY);

		return request(app)
			.post("/api/v1/movies")
			.set("Authorization", `Bearer ${token}`)
			.expect((res: Response) => {
				expect(res.status).not.toBe(401);
			});
	});

	it("should return 422 if no title is provided", async () => {
		const token = await jwt.sign({ id: "123" }, process.env.JWT_PRIVATE_KEY);

		return request(app)
			.post("/api/v1/movies")
			.set("Authorization", `Bearer ${token}`)
			.expect((res: Response) => {
				expect(res.status).toBe(422);
			});
	});

	it("should return 404 if no movie was found for given title in external database", async () => {
		const token = await jwt.sign({ id: "123" }, process.env.JWT_PRIVATE_KEY);

		return request(app)
			.post("/api/v1/movies")
			.set("Authorization", `Bearer ${token}`)
			.send({ title: "Zażółć gęślą jaźń" })
			.expect((res: Response) => {
				expect(res.status).toBe(404);
			});
	});
});

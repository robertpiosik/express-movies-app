const request = require("supertest");
import app from "../app";

describe("GET /", () => {
	it("should return 200 'OK'", () => {
		return request(app)
			.get("/")
			.expect(200);
	});
});

describe("POST /api/v1/auth/login", () => {
	it("without email or password should return 422 'Unprocessable Entity'", () => {
		return request(app)
			.post("/api/v1/auth/login")
			.expect(422);
	});
});

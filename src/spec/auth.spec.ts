import request, { Response } from "supertest";
import app from "../app";

describe("POST /api/v1/auth/signup", () => {
	it("without email or password should return 422 'Unprocessable Entity'", () => {
		return request(app)
			.post("/api/v1/auth/signup")
			.expect((res: Response) => {
				expect(res.status).toBe(422);
			});
	});

	it("should return 422 on invalid email", () => {
		return request(app)
			.post("/api/v1/auth/signup")
			.send({ email: "piosiknetguru.com", password: "12345678" })
			.expect((res: Response) => {
				expect(res.status).toBe(422);
			});
	});

	it("should return 422 on password which is less than 8 characters long", () => {
		return request(app)
			.post("/api/v1/auth/signup")
			.send({ email: "piosik@nerguru.com", password: "1234" })
			.expect((res: Response) => {
				expect(res.status).toBe(422);
			});
	});
});

describe("POST /api/v1/auth/login", () => {
	it("without email or password should return 422 'Unprocessable Entity'", () => {
		return request(app)
			.post("/api/v1/auth/login")
			.expect((res: Response) => {
				expect(res.status).toBe(422);
			});
	});

	it("with email and password should NOT return 422 'Unprocessable Entity'", () => {
		return request(app)
			.post("/api/v1/auth/login")
			.send({ email: "piosik@netguru.com", password: "1234" })
			.expect((res: Response) => {
				expect(res.status).not.toBe(422);
			});
	});
});

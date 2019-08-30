import request, { Response } from "supertest";
import app from "../app";

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

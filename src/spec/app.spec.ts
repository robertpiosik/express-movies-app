import request, { Response } from "supertest";
import app from "../app";

describe("GET /", () => {
	it("should return 200", () => {
		return request(app)
			.get("/")
			.expect((res: Response) => {
				expect(res.status).toBe(200);
			});
	});

	it("should return 404", () => {
		return request(app)
			.get("/random-url")
			.expect((res: Response) => {
				expect(res.status).toBe(404);
			});
	});
});

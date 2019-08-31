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

// describe("POST /api/v1/movies", () => {
// 	it("should return 422 without Authorization header", () => {
// 		return request(app)
// 			.post("/api/v1/movies")
// 			.expect((res: Response) => {
// 				expect(res.status).toBe(422);
// 			});
// 	});
// });

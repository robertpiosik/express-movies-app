require("dotenv").config();
import request, { Response } from "supertest";
import jwt from "jsonwebtoken";
import mockingoose from "mockingoose";

import app from "../app";
import Movie from "../models/movie";
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

	it("should return 409 if title is already in APP database", async () => {
		const token = await jwt.sign({ id: "123" }, process.env.JWT_PRIVATE_KEY);

		const _doc = {
			title: "Interstellar"
		};

		const mockFinder = (query: any) => {
			if (query.getQuery().title === "Interstellar") return _doc;
		};

		mockingoose(Movie).toReturn(mockFinder, "findOne");

		return request(app)
			.post("/api/v1/movies")
			.set("Authorization", `Bearer ${token}`)
			.send({ title: "Interstellar" })
			.expect((res: Response) => {
				expect(res.status).toBe(409);
			});
	});

	it("should return 201 and document in res.body.data on success", async () => {
		const token = await jwt.sign(
			{ userId: "5d69b6110c88517530d0b246" },
			process.env.JWT_PRIVATE_KEY
		);

		const _doc = {
			fetchedMovieData: {
				Title: "Interstellar"
			}
		};

		mockingoose(Movie).toReturn(null, "findOne");
		mockingoose(Movie).toReturn(_doc, "save");

		return request(app)
			.post("/api/v1/movies")
			.set("Authorization", `Bearer ${token}`)
			.send({ title: "Interstellar" })
			.expect((res: Response) => {
				expect(res.status).toBe(201);
				expect(res.body.data.fetchedMovieData.Title).toBe("Interstellar");
			});
	});
});

describe("GET /api/v1/movies", () => {
	it("should return 200", () => {
		return request(app)
			.get("/api/v1/movies")
			.expect((res: Response) => {
				expect(res.status).toBe(200);
			});
	});

	it("should return movie documents and total movies", () => {
		const _doc = [{ title: "Abc" }, { title: "Def" }];
		mockingoose(Movie).toReturn(2, "countDocuments");
		mockingoose(Movie).toReturn(_doc, "find");
		return request(app)
			.get("/api/v1/movies")
			.expect((res: Response) => {
				expect(res.body.data.movies[0].title).toBe("Abc");
				expect(res.body.data.movies[1].title).toBe("Def");
				expect(res.body.data.total).toBe(2);
			});
	});
});

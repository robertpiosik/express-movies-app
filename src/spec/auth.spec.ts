require("dotenv").config();
import request, { Response } from "supertest";
import mockingoose from "mockingoose";
import bcrypt from "bcryptjs";
import app from "../app";
import User from "../models/user";

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

	it("should return 422 if email is invalid", () => {
		return request(app)
			.post("/api/v1/auth/login")
			.send({ email: "piosiknetguru.com", password: "12345678" })
			.expect((res: Response) => {
				expect(res.status).toBe(422);
			});
	});

	it("should return 404 if email is not registered", () => {
		mockingoose(User).toReturn(null, "findOne");

		return request(app)
			.post("/api/v1/auth/login")
			.send({ email: "notregistered@netguru.com", password: "12345678" })
			.expect((res: Response) => {
				expect(res.status).toBe(404);
			});
	});

	it("should return 200, token and expiresAt on successful authentication", async () => {
		const password = "12345678";
		const hashedPassword = await bcrypt.hash(password, 10);
		const _doc = {
			_id: "5d69b6110c88517530d0b246",
			email: "piosik@netguru.com",
			password: hashedPassword
		};

		const finderMock = (query: any) => {
			if (query.getQuery().email === _doc.email) return _doc;
		};

		mockingoose(User).toReturn(finderMock, "findOne");

		return request(app)
			.post("/api/v1/auth/login")
			.send({ email: "piosik@netguru.com", password: "12345678" })
			.expect((res: Response) => {
				expect(res.status).toBe(200);
				expect(res.body.data.token).toBeDefined;
				expect(res.body.data.expiresAt).toBeDefined;
			});
	});

	it("should return 401 if password mismatch", async () => {
		const password = "12345678";
		const hashedPassword = await bcrypt.hash(password, 10);
		const _doc = {
			_id: "5d69b6110c88517530d0b246",
			email: "piosik@netguru.com",
			password: hashedPassword
		};

		const finderMock = (query: any) => {
			if (query.getQuery().email === _doc.email) return _doc;
		};

		mockingoose(User).toReturn(finderMock, "findOne");

		return request(app)
			.post("/api/v1/auth/login")
			.send({ email: "piosik@netguru.com", password: "87654321" })
			.expect((res: Response) => {
				expect(res.status).toBe(401);
			});
	});
});

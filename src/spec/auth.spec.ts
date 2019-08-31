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

	it("should return token & expiresAt on successful login", async () => {
		const password = "12345678";
		const hashedPassword = await bcrypt.hash(password, 10);
		const _doc = {
			_id: "5d69b6590c88517530d0b247",
			email: "piosik@netguru.com",
			password: hashedPassword
		};

		mockingoose(User).toReturn(_doc, "findOne");

		return request(app)
			.post("/api/v1/auth/login")
			.send({ email: "piosik@netguru.com", password: "12345678" })
			.expect((res: Response) => {
				expect(res.body.data.token).not.toBeUndefined;
			});
	});
});

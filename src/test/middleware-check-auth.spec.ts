import { Request, Response } from "express";
import checkAuth from "../middleware/check-auth";

describe("middleware checkAuth", () => {
	it("should return an error if no auth header is present", done => {
		// const req: any = {
		// 	isAuth: null,
		// 	userId: null,
		// 	get() {
		// 		return null;
		// 	}
		// };
		// const res: any = null;

		checkAuth({} as Request, {} as Response, error => {
			if (error.message === "Not authorized.") done();
			return new Error(
				"Expected to return error with message: Not authorized."
			);
		});
	});
});

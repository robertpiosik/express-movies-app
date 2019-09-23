import checkAuth from "../middleware/check-auth";

describe("middleware checkAuth", () => {
	it("should return an error if no auth header is present", done => {
		const req = {
			isAuth: null,
			userId: null,
			get() {
				return null;
			}
		};

		checkAuth(req as any, {} as any, error => {
			if (error.message === "Not authorized1.") done();
			throw new Error(
				"Expected to return error with message: Not authorized."
			);
		});
	});
});

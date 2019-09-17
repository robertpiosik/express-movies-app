import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import Movie from "../models/movie";
import Comment from "../models/comment";
import User from "../models/user";

interface ResponseError extends Error {
	status?: number;
	data?: any;
}

export const postComments = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { content, movieId } = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const error: ResponseError = new Error("Validation errors.");
		error.status = 422;
		error.data = errors.array();
		return next(error);
	}

	try {
		const movie = await Movie.findOne({ _id: movieId });
		if (!movie) {
			const error: ResponseError = new Error("Invalid movie");
			error.status = 422;
			return next(error);
		}

		const newComment = await new Comment({
			creator: req.userId,
			movieId: movie._id,
			content
		}).save();

		movie.comments.push(newComment._id);
		await movie.save();

		const creator = await User.findById(req.userId);
		if (creator) {
			creator.comments.push(newComment._id);
			await creator.save();
		}

		res.status(201).json({ name: "Success", data: newComment });
	} catch (err) {
		const error: ResponseError = new Error("Server error.");
		error.data = err;
		next(error);
	}
};

export const getComments = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const page = req.query.page || 1;
	const perPage = parseInt(req.query.per_page) || 2;
	try {
		const total = await Comment.countDocuments();

		const comments = await Comment.find()
			.skip((page - 1) * perPage)
			.limit(perPage)
			.populate({ path: "creator", select: "email" })
			.populate({ path: "movieId", select: "title" });

		res.status(200).json({ name: "Success", data: { total, comments } });
	} catch (err) {
		const error: ResponseError = new Error("Server error.");
		error.data = err;
		next(error);
	}
};

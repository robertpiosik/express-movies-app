import { Request, Response, NextFunction } from "express";

import Movie from "../models/movie";
import Comment from "../models/comment";
import User from "../models/user";

export const postComments = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.isAuth) {
		return next({
			status: 401,
			name: "NotAuthorized",
			message: "You are not authorized."
		});
	}

	const { content, movieId } = req.body;

	if (!content || !movieId) {
		return next({
			status: 422,
			name: "MissingData",
			message: "Content or movieId is missing"
		});
	}

	try {
		const movie = await Movie.findOne({ _id: movieId });
		if (!movie) {
			return next({
				status: 422,
				name: "MovieNotFound"
			});
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
	} catch (error) {
		next({ data: error });
	}
};

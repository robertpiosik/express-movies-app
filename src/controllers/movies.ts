import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import fetch from "node-fetch";

import Movie from "../models/movie";
import User from "../models/user";

interface ResponseError extends Error {
	status?: number;
	data?: any;
}

export const getMovies = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const page = req.query.page || 1;
	const perPage = parseInt(req.query.per_page) || 2;
	try {
		const total = await Movie.countDocuments();
		const movies = await Movie.find()
			.skip((page - 1) * perPage)
			.limit(perPage)
			.populate({
				path: "creator",
				select: "email"
			})
			.populate({
				path: "comments",
				select: "content createdAt updatedAt",
				populate: { path: "creator", select: "email" }
			});
		res.status(200).json({ name: "Success", data: { total, movies } });
	} catch (err) {
		const error: ResponseError = new Error("Server error.");
		error.data = err;
		next(error);
	}
};

export const postMovies = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { title } = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const error: ResponseError = new Error("Validation failed.");
		error.status = 422;
		error.data = errors.array();
		return next(error);
	}

	const omdbEndpoint = encodeURI(
		`http://www.omdbapi.com/?t=${title}&apikey=${process.env.OMDB_API_KEY}`
	);
	try {
		const movieData = await fetch(omdbEndpoint).then(res => res.json());

		if (movieData.Response === "False") {
			const error: ResponseError = new Error("Movie not found in external db.");
			error.status = 404;
			return next(error);
		}

		const movie = await Movie.findOne({ title });
		if (!movie) {
			const newMovie = await new Movie({
				title: movieData.Title,
				creator: req.userId,
				fetchedMovieData: {
					...movieData
				}
			}).save();

			const creator = await User.findOne({ _id: req.userId });
			if (creator) {
				creator.movies.push(newMovie._id);
				creator.save();
			}

			res.status(201).json({
				name: "Success",
				message: "Movie has been added successfully.",
				data: newMovie
			});
		} else {
			const error: ResponseError = new Error("Movie already exists.");
			error.status = 409;
			next(error);
		}
	} catch (err) {
		const error: ResponseError = new Error("Server error.");
		error.data = err;
		next(error);
	}
};

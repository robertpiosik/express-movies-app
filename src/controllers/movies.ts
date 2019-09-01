import { Request, Response, NextFunction } from "express";
import fetch from "node-fetch";

import Movie from "../models/movie";
import User from "../models/user";

export const getMovies = (req: Request, res: Response, next: NextFunction) => {
	res.sendStatus(200);
};

export const postMovies = async (
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

	const { title } = req.body;

	if (!title) {
		return next({
			status: 422,
			name: "MissingTitle",
			message: "Title is missing."
		});
	}

	const omdbEndpoint = encodeURI(
		`http://www.omdbapi.com/?t=${title}&apikey=${process.env.OMDB_API_KEY}`
	);
	try {
		const movieDataResponse = await fetch(omdbEndpoint);
		const movieData = await movieDataResponse.json();

		if (movieData.Response === "False") {
			return next({
				status: 404,
				name: "MovieNotFound",
				message: "Movie was not found."
			});
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

			const creator = await User.findById(req.userId);
			if (creator) {
				creator.movies.push(newMovie._id);
				creator.save();
			}

			return res.status(201).json({
				name: "Success",
				message: "Movie has been added successfully.",
				data: newMovie
			});
		} else {
			next({
				status: 409,
				name: "AlreadyExists",
				message: "Movie already exists."
			});
		}
	} catch (error) {
		next({ data: error });
	}
};

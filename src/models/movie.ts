import mongoose, { Schema, Document } from "mongoose";

export interface MovieDocument extends Document {
	title: string;
	details: {
		year: string;
		rated: string;
		released: string;
		runtime: string;
		genre: string;
		director: string;
		writer: string;
		actors: string;
		plot: string;
		language: string;
		country: string;
		awards: string;
		poster: string;
		ratings: Array<{
			source: string;
			value: string;
		}>;
		metascore: string;
		imdbRating: string;
		type: string;
		dvd: string;
		boxOffice: string;
		production: string;
		website: string;
	};
	comments: Array<string>;
};

const movieSchema: Schema = new Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true
		},
		details: {
			year: String,
			rated: String,
			released: String,
			runtime: String,
			genre: String,
			director: String,
			writer: String,
			actors: String,
			plot: String,
			language: String,
			country: String,
			awards: String,
			poster: String,
			ratings: [{ source: String, value: String }],
			metascore: String,
			imdbRating: String,
			type: String,
			dvd: String,
			boxOffice: String,
			production: String,
			website: String
		},
		comments: [
			{
				type: Schema.Types.ObjectId,
				ref: "Comment",
				required: true
			}
		]
	},
	{ timestamps: true }
);

export const Movie = mongoose.model<MovieDocument>("Movie", movieSchema);

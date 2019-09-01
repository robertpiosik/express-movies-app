import mongoose, { Schema, Document } from "mongoose";

interface MovieDocument extends Document {
	title: string;
	creator: string;
	fetchedMovieData: object;
	comments: Array<string>;
}

const movieSchema: Schema = new Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true
		},
		creator: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		fetchedMovieData: {
			type: Object
		},
		comments: [
			{
				type: Schema.Types.ObjectId,
				ref: "Comment"
			}
		]
	},
	{ timestamps: true }
);

export default mongoose.model<MovieDocument>("Movie", movieSchema);

import mongoose, { Schema, Document } from "mongoose";

interface UserDocument extends Document {
	email: string;
	password: string;
	movies: Array<string>;
	comments: Array<string>;
}

const userSchema: Schema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		movies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
		comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
	},
	{ timestamps: true }
);

export default mongoose.model<UserDocument>("User", userSchema);

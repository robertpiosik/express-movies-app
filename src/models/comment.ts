import mongoose, { Schema, Document } from "mongoose";

interface commentSchema extends Document {
	author: string,
	content: string
}

const commentSchema: Schema = new Schema(
	{
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		movie: {
			type: Schema.Types.ObjectId,
			ref: "Movie",
			required: true
		},
		content: String,
	},
	{ timestamps: true }
);

export default mongoose.model<commentSchema>('Comment', commentSchema);
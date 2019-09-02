import mongoose, { Schema, Document } from "mongoose";

interface CommentDocument extends Document {
	creator: string; 
	movieId: string
	content: string;
}

const commentSchema: Schema = new Schema(
	{
		creator: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		movieId: {
			type: Schema.Types.ObjectId,
			ref: "Movie"
		},
		content: String
	},
	{ timestamps: true }
);

export default mongoose.model<CommentDocument>("Comment", commentSchema);

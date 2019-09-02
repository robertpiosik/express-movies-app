import mongoose, { Schema, Document } from "mongoose";

interface CommentDocument extends Document {
	creator: string; 
	movie: string; 
	content: string;
}

const commentSchema: Schema = new Schema(
	{
		creator: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		movie: {
			type: Schema.Types.ObjectId,
			ref: "Movie",
			required: true
		},
		content: String
	},
	{ timestamps: true }
);

export default mongoose.model<CommentDocument>("Comment", commentSchema);

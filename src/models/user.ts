import mongoose, { Schema, Document } from "mongoose";

interface userSchema extends Document {
	email: string;
	password: string;
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
		}
	},
	{ timestamps: true }
);

export default mongoose.model<userSchema>("User", userSchema);

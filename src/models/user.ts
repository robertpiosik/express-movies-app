import mongoose, { Schema, Document } from "mongoose";

export interface UserDocument extends Document {
	email: string;
	password: string;
};

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

export const User = mongoose.model<UserDocument>("User", userSchema);

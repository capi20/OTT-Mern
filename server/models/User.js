import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please provide name"],
		trim: true
	},
	email: {
		type: String,
		required: [true, "Please provide email"],
		validate: {
			validator: validator.isEmail,
			message: "Please provide a valid email"
		},
		unique: true
	},
	password: {
		type: String,
		required: [true, "Please provide password"],
		minlength: 6,
		select: false
	}
});

userSchema.pre("save", async function () {
	if (!this.isModified("password")) return;
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function () {
	return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_LIFETIME
	});
};

userSchema.methods.comparePassword = async function (condidatePassword) {
	const isMatch = await bcrypt.compare(condidatePassword, this.password);
	return isMatch;
};

export default mongoose.model("User", userSchema);

import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import attachCookies from "../utils/attachCookies.js";

export const register = async (req, res, next) => {
	const { name, email, password } = req.body;

	if (!email || !name || !password) {
		throw new BadRequestError("Please provide all values");
	}

	const user = await User.create({ name, email, password });
	const token = user.createJWT();
	attachCookies({ res, token });
	res.status(StatusCodes.CREATED).json({
		user: {
			email: user.email,
			name: user.name
		}
	});
};

export const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new BadRequestError("Please provide all values");
	}
	const user = await User.findOne({ email }).select("+password");
	if (!user) {
		throw new UnauthenticatedError("Invalid Credentials");
	}

	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) {
		throw new UnauthenticatedError("Invalid Credentials");
	}

	const token = user.createJWT();
	user.password = undefined;
	attachCookies({ res, token });
	res.status(StatusCodes.OK).json({ user });
};

export const updateUser = async (req, res) => {
	const { email, name, password } = req.body;

	if (!email || !name) {
		throw new BadRequestError("Please provide name and email");
	}

	const user = await User.findOne({ _id: req.user.userId });

	// user.email = email;
	user.name = name;
	if (password !== "") {
		user.password = password;
	}

	await user.save();

	const token = user.createJWT();
	attachCookies({ res, token });
	res.status(StatusCodes.OK).json({ user });
};

export const getCurrentUser = async (req, res) => {
	const user = await User.findOne({ _id: req.user.userId });
	res.status(StatusCodes.OK).json({ name: user.name, email: user.email });
};

export const logout = async (req, res) => {
	res.cookie("token", "logout", {
		httpOnly: true,
		expires: new Date(Date.now())
	});

	res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

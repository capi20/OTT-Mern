import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";

const auth = (req, res, next) => {
	const token = req.cookies.token;
	if (!token) {
		throw new UnauthenticatedError("Authentication invalid");
	}
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		//console.log(payload);
		const testUser = payload.userId === "6541878d0aacde77fed3bd5d";
		req.user = { userId: payload.userId, testUser };
		next();
	} catch (error) {
		throw new UnauthenticatedError("Authentication invalid");
	}
};

export default auth;

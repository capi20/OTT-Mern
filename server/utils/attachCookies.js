const attachCookies = ({ res, token }) => {
	const cookieOptions = {
		expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
		httpOnly: true
	};
	if (process.env.NODE_ENV === "production") {
		cookieOptions.secure = true;
		cookieOptions.sameSite = "None";
	}
	res.cookie("token", token, cookieOptions);
};

export default attachCookies;

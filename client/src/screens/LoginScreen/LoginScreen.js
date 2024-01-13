import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormRow from "../../components/FormRow.js";
import { useAppContext } from "../../context/AppContext.js";
import { StyledLogin } from "./LoginScreen.styled.js";
import login_logo from "../../images/login_logo.svg";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

const initialState = {
	name: "",
	email: "",
	password: "",
	isMember: true
};

function SignInScreen() {
	const [values, setValues] = useState(initialState);
	const {
		userLoading,
		user,
		showAlert,
		alertType,
		alertMsg,
		setupUser,
		setupTestUser,
		displayAlert
	} = useAppContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			setTimeout(() => {
				navigate("/");
			}, 1000);
		}
	}, [user]);

	const signIn = (e) => {
		e.preventDefault();

		const { name, email, password, isMember } = values;

		if (!email || !password || (!isMember && !name)) {
			displayAlert();
			return;
		}

		const user = { name, email, password };

		if (isMember) {
			setupUser(user, "login", "Login Successful! Redirecting...");
		} else {
			setupUser(user, "register", "User Created! Redirecting...");
		}
	};

	const onChangeHandler = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const toggleMember = () => {
		setValues({ ...initialState, isMember: !values.isMember });
	};

	return (
		<StyledLogin className="login">
			<form>
				<h1 className="mb-2 align-center">
					{values.isMember ? "Login" : "Register"}
				</h1>
				{showAlert && <Alert severity={alertType}>{alertMsg}</Alert>}
				{!values.isMember && (
					<FormRow
						type="text"
						name="name"
						value={values.name}
						handleChange={onChangeHandler}
					/>
				)}
				<FormRow
					type="email"
					name="email"
					value={values.email}
					handleChange={onChangeHandler}
				/>
				<FormRow
					type="password"
					name="password"
					value={values.password}
					handleChange={onChangeHandler}
				/>
				<button
					type="submit"
					className="mt-2 btn"
					onClick={signIn}
					disabled={userLoading}>
					{userLoading ? (
						<CircularProgress
							size={24}
							sx={{
								color: "#fff"
							}}
						/>
					) : (
						"Submit"
					)}
				</button>
				<button
					type="button"
					className="demo-button btn"
					onClick={() => {
						setupTestUser(
							{ email: "testUser@test.com", name: "test user", testUser: true },
							"Login Successful! Redirecting..."
						);
					}}>
					Demo App
				</button>
				<p>
					{values.isMember ? "Not a member yet?" : "Already a member?"}

					<button type="button" onClick={toggleMember} className="member-btn">
						{values.isMember ? "Register" : "Login"}
					</button>
				</p>
			</form>
			<img src={login_logo} alt="home cinema logo" className="login-img" />
		</StyledLogin>
	);
}

export default SignInScreen;

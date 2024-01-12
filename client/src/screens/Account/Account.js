import { useState } from "react";
import FormRow from "../../components/FormRow";
import StyledAccount from "./Account.styled";
import { useAppContext } from "../../context/AppContext";
import PageWrapper from "../../hoc/PageWrapper";

const Account = () => {
	const { user, displayAlert, updateUser } = useAppContext();
	const [values, setValues] = useState({
		name: user.name,
		email: user.email,
		password: ""
	});

	const onChangeHandler = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const { name, email, password } = values;
		if (!name) {
			displayAlert("Name can not be empty");
			return;
		}
		updateUser({ name, email, password });
	};

	return (
		<StyledAccount>
			<form className="account" onSubmit={handleSubmit}>
				{/* {showAlert && (
					<Alert severity={alertType ? alertType : "success"}>{alertMsg}</Alert>
				)} */}
				<h1 className="color-primary">Account Details</h1>
				<FormRow
					type="name"
					name="name"
					value={values.name}
					handleChange={onChangeHandler}
				/>
				<FormRow
					type="email"
					name="email"
					value={values.email}
					handleChange={onChangeHandler}
					disable={true}
				/>
				<FormRow
					type="password"
					name="password"
					value={values.password}
					handleChange={onChangeHandler}
				/>
				<button className="account-btn btn">Save changes</button>
			</form>
		</StyledAccount>
	);
};
export default PageWrapper(Account);

import styled from "styled-components";

const Wrapper = styled.div.attrs({
	className: "form-row"
})`
	label {
		display: block;
		text-transform: capitalize;
		letter-spacing: 0.5px;
		color: black;
	}

	input {
		outline-width: 0;
		height: 40px;
		width: 100%;
		border-radius: 5px;
		border: 1px solid gray;
		padding: 5px 10px;
		font-size: 1rem;
	}
`;

const FormRow = ({
	type,
	name,
	value,
	handleChange,
	labelText,
	disable = false
}) => {
	return (
		<Wrapper>
			<label htmlFor={name} className="form-label mb-1">
				{labelText || name}
			</label>
			<input
				type={type}
				value={value}
				name={name}
				id={name}
				onChange={handleChange}
				className="form-input"
				disabled={disable}
				style={{ background: disable ? "rgba(0,0,0,0.2)" : "#fff" }}
			/>
		</Wrapper>
	);
};
export default FormRow;

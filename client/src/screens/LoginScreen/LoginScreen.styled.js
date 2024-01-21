import styled from "styled-components";

export const StyledLogin = styled.div`
	color: black;
	letter-spacing: 1px;
	font-size: 1.125rem;
	display: flex;
	align-items: center;
	background: white;
	min-height: 100vh;
	min-height: 100svh;
	background: #192133;

	@media only screen and (max-width: 768px) {
		font-size: 1rem;
	}

	.heading {
		font-weight: 500;

		@media only screen and (max-width: 768px) {
			font-size: 28px;
		}
	}

	.sub-heading {
		font-size: 18px;
		color: gray;
		text-align: left;
		margin-top: -11px;
		margin-bottom: 15px;
	}

	.form-wrapper {
		flex: 1;
		background: white;
		height: 100vh;
		height: 100svh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	form {
		flex: 1;
		color: #192133;
		display: flex;
		flex-direction: column;
		gap: 20px;
		max-width: 512px;
		padding: 30px;

		label {
			font-size: 16px;
		}
	}

	form button {
		background-color: orange;
		width: 100%;
	}

	.demo-button {
		background-color: transparent;
		border: 1px solid black;
		color: black;
	}

	p {
		text-align: center;
		letter-spacing: 0.5px;
	}

	.member-btn {
		padding: 0 5px;
		background: transparent;
		cursor: pointer;
		color: orange;
		width: auto;
	}

	.img-wrapper {
		flex: 1;
		padding: 20px;
		text-align: center;

		@media only screen and (max-width: 768px) {
			display: none;
		}
	}

	.login-img {
		max-width: 90%;
	}
`;

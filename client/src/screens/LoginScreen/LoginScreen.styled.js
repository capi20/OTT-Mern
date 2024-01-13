import styled from "styled-components";

export const StyledLogin = styled.div`
	color: black;
	letter-spacing: 1px;
	font-size: 1.125rem;
	display: flex;
	justify-content: space-around;
	align-items: center;
	background: white;
	min-height: 100vh;
	padding: 0 10px;
	background: #192133;

	@media only screen and (max-width: 768px) {
		font-size: 1rem;
	}

	form {
		color: #192133;
		background: #fff;
		display: flex;
		flex-direction: column;
		gap: 20px;
		min-width: 30%;
		max-width: 40%;
		padding: 30px;
		box-shadow: 0px 0px 63px -17px rgba(0, 0, 0, 0.75);
		-webkit-box-shadow: 0px 0px 63px -17px rgba(0, 0, 0, 0.75);
		-moz-box-shadow: 0px 0px 63px -17px rgba(0, 0, 0, 0.75);

		@media only screen and (max-width: 768px) {
			min-width: 70%;
			max-width: 100%;
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

	.login-img {
		max-width: 40%;

		@media only screen and (max-width: 768px) {
			display: none;
		}
	}
`;

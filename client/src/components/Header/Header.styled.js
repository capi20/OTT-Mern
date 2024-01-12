import styled from "styled-components";

export const StyledNav = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	top: 0;
	padding: 18px 60px;
	width: 100%;
	z-index: 999;
	background-image: linear-gradient(
		180deg,
		#192133,
		rgba(37, 37, 37, 0.7),
		transparent
	);

	@media only screen and (max-width: 768px) {
		padding: 18px 30px;
	}

	.nav__logo {
		cursor: pointer;
		color: orange;
		font-weight: 700;
		font-size: 30px;
	}

	.nav {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		flex: 1;
		gap: 20px;

		svg {
			width: 32px;
			height: 32px;
			color: white;
		}
	}

	.nav__search {
		display: flex;
		justify-content: flex-end;
		width: 100%;
		max-width: 300px;
		position: relative;
		z-index: 99;

		input {
			outline: none;
			width: 0px;
			opacity: 0;
			padding: 10px 15px;
			margin-right: -35px;
			border: 1px solid white;
			background-color: #192133;
			color: white;
			font-size: 17px;
			transition: all 0.3s;
		}

		.show-search {
			width: 100%;
			opacity: 1;
		}

		button {
			background: transparent;
			border: none;
			padding: 0;
			border-radius: 99px;
			cursor: pointer;
			position: relative;
			z-index: 9;
		}
	}

	.user {
		position: relative;
		text-align: center;
	}

	.user-dropdown {
		position: absolute;
		z-index: 99;
		top: 40px;
		right: 0;
		width: max-content;
		color: #fff;
		background: orange;
		visibility: hidden;
		border-radius: 5px;
		padding: 0.5rem;

		li {
			list-style: none;
			font-size: 1.1rem;
			padding: 0.5rem;
			letter-spacing: 1;
		}

		.user-dropdown_btn {
			background: transparent;
			color: white;
			border-color: transparent;
			text-transform: capitalize;
			cursor: pointer;
		}
	}
	.show-dropdown {
		visibility: visible;
	}

	.user-icon {
		color: white;
		display: flex;
		align-items: center;
		background: transparent;
	}
`;

import styled from "styled-components";

export const StyledNav = styled.header`
	max-width: 1440px;
	display: flex;
	gap: 10px;
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
		padding: 14px 30px;
	}

	@media only screen and (max-width: 540px) {
		padding: 14px 10px;
	}

	.nav__logo {
		cursor: pointer;
		color: orange;
		font-weight: 700;
		font-size: 24px;
	}

	.nav {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		flex: 1;
		gap: 20px;
		font-size: 18px;

		svg {
			width: 28px;
			height: 28px;
			color: white;
		}
	}

	.search-wrapper {
		display: flex;
		justify-content: flex-end;
		position: relative;

		input {
			outline: none;
			width: 100%;
			padding: 10px 15px;
			margin-right: -35px;
			border: 1px solid white;
			background-color: #192133;
			color: white;
			font-size: 17px;
			transition: all 0.3s;

			@media only screen and (max-width: 768px) {
				font-size: 14px;
				top: -6px;
			}
		}

		.nav-search {
			opacity: 0;
			width: 0;
			position: absolute;
			top: -24px;
			right: 0;
		}

		.show-search {
			width: 300px;
			opacity: 1;
			z-index: 99;
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
		display: none;
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
	.show {
		display: block !important;
	}

	.user-icon {
		color: white;
		display: flex;
		align-items: center;
		background: transparent;
	}

	.genre-wrapper {
		position: relative;
		color: white;
		cursor: pointer;
		width: 106px;
	}

	.genre {
		display: flex;
		align-items: center;
		justify-content: flex-end;

		&-name {
			text-overflow: ellipsis;
			text-wrap: nowrap;
			overflow: hidden;
		}
	}

	.arrow-up {
		transform: rotate(180deg);
	}

	.genre-list {
		display: none;
		background: #192133;
		position: absolute;
		z-index: 99;
		left: 0;
		top: 35px;
		max-height: 250px;
		overflow-y: auto;
		border: 1px solid #fff;

		li {
			list-style: none;
			font-size: 16px;
			padding: 5px;
			letter-spacing: 1;
			text-align: center;
			color: gray;

			&:hover {
				background: white;
				color: black;
			}
		}

		&::-webkit-scrollbar {
			display: none;
		}
	}

	.watchlist {
		@media only screen and (max-width: 540px) {
			display: none;
		}
	}

	.watchlist-menu {
		display: none;

		@media only screen and (max-width: 540px) {
			display: block;
		}
	}
`;

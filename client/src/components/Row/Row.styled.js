import styled from "styled-components";

export const StyledRow = styled.div`
	color: white;

	.row-heading {
		display: flex;
		align-items: center;

		h2 {
			position: relative;
			z-index: 1;
			font-weight: 500;
			margin: 0;
			padding-left: 60px;
			font-size: 20px;

			@media only screen and (max-width: 768px) {
				padding-left: 30px;
				font-size: 18px;
			}

			@media only screen and (max-width: 540px) {
				padding-left: 10px;
			}
		}

		a {
			display: flex;
			align-items: center;
			color: white;
			text-decoration: none;
			font-size: 14px;
			transform: translateX(-70px);
			transition: transform 0.3s;

			.see-more {
				opacity: 0;
			}

			&:hover {
				color: orange;
			}
		}

		&:hover a {
			transform: translateX(10px);

			.see-more {
				opacity: 1;
				transition: all 0.4s;
			}
		}
	}

	.row-posters {
		display: flex;
		gap: 5px;
		overflow-y: auto;
		overflow-x: scroll;
		padding: 10px 60px 30px;

		@media only screen and (max-width: 768px) {
			padding: 7px 30px 20px;
		}

		@media only screen and (max-width: 540px) {
			padding: 7px 10px 20px;
		}
	}

	.row-posters::-webkit-scrollbar {
		display: none;
	}
`;

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
			font-size: 20px;
			padding-left: 7px;

			@media only screen and (max-width: 768px) {
				font-size: 18px;
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
		padding: 7px;
	}

	.row-posters::-webkit-scrollbar {
		display: none;
	}
`;

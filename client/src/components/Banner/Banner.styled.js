import styled from "styled-components";

export const StyledBanner = styled.div`
	height: 90vh;
	color: white;
	object-fit: contain;
	background-size: cover;
	background-position: center center;

	.banner {
		background-image: linear-gradient(
			180deg,
			transparent,
			rgba(37, 37, 37, 0.61),
			#192133
		);
		width: 100%;
		height: 100%;
	}

	.banner__content {
		position: absolute;
		left: 60px;
		top: 25%;
		width: 40%;

		@media only screen and (max-width: 768px) {
			width: 70%;
			left: 30px;
		}

		&-title {
			font-size: 2.5rem;
			font-weight: 700;
		}

		&-buttons {
			display: flex;
			gap: 12px;

			@media only screen and (max-width: 768px) {
				flex-direction: column;
			}
		}
	}
`;

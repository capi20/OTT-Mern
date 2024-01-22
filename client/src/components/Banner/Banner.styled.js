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

	.banner__content-wrapper {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.banner__content {
		position: absolute;
		left: 60px;
		top: 25%;
		width: 50%;

		@media only screen and (max-width: 768px) {
			width: 70%;
			left: 30px;
		}

		@media only screen and (max-width: 540px) {
			left: 10px;
		}

		&-buttons {
			display: flex;
			gap: 12px;

			button {
				font-size: 18px;
			}
		}
	}
`;

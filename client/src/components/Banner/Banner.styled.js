import styled from "styled-components";

export const StyledBanner = styled.div`
	height: 600px;
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
		width: 100%;
		height: 100%;
		padding-top: 200px;
	}

	.banner__content {
		width: 50%;

		@media only screen and (max-width: 540px) {
			width: 70%;
		}

		&-buttons {
			display: flex;
			gap: 12px;
			flex-wrap: wrap;

			button {
				font-size: 18px;
			}
		}
	}
`;

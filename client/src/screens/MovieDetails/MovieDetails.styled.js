import styled from "styled-components";

const StyledMovieDetails = styled.div`
	color: white;
	min-height: 100vh;
	background-size: cover;
	background-position: center center;
	display: flex;
	flex-direction: column;
	gap: 40px;

	.details {
		display: flex;
		justify-content: center;
		gap: 70px;
		margin-top: 50px;
		margin-bottom: 40px;

		@media only screen and (max-width: 900px) {
			gap: 30px;
		}

		@media only screen and (max-width: 768px) {
			flex-direction: column;
			align-items: center;
			margin-top: 0;
		}

		&-img {
			width: 30%;
			display: flex;
			align-items: center;

			@media only screen and (max-width: 900px) {
				width: 40%;
			}

			img {
				width: 100%;
			}
		}

		&-content {
			width: 50%;
			display: flex;
			flex-direction: column;
			gap: 20px;
			font-size: 1.25rem;

			@media only screen and (max-width: 900px) {
				width: 60%;
			}

			@media only screen and (max-width: 768px) {
				width: 100%;
				font-size: 1rem;
			}

			&--length {
				color: gray;
			}

			&--rating {
				display: flex;
				align-items: center;
				gap: 5px;

				svg {
					color: gold;
				}
			}

			&--genres {
				display: flex;
				gap: 20px;
				flex-wrap: wrap;
			}

			&--genre {
				color: gray;
			}

			&--btns {
				display: flex;
				gap: 20px;
				flex-wrap: wrap;
			}

			.round-button {
				height: 57px;
				width: 57px;
				background: #192133;

				@media only screen and (max-width: 768px) {
					height: 45px;
					width: 45px;
				}

				svg {
					font-size: 36px;

					@media only screen and (max-width: 768px) {
						font-size: 30px;
					}
				}
			}
		}
	}
`;

export default StyledMovieDetails;

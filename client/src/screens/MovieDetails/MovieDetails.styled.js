import styled from "styled-components";

const StyledMovieDetails = styled.div`
	color: white;

	.details {
		display: flex;
		justify-content: center;
		gap: 70px;
		margin-bottom: 50px;
		margin-top: 50px;

		@media only screen and (max-width: 768px) {
			flex-direction: column;
			align-items: center;
			gap: 30px;
			margin-top: 0;
		}

		&-img {
			width: 30%;
			text-align: right;
			max-width: 450px;

			@media only screen and (max-width: 768px) {
				width: 50%;
			}

			img {
				width: 100%;
			}
		}

		&-content {
			width: 50%;
			color: #fff;
			display: flex;
			flex-direction: column;
			gap: 20px;
			font-size: 1.25rem;

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
				color: white;
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

	.recommend {
		margin-top: 60px;

		h3 {
			font-size: 1.5rem;
		}

		&-item {
			display: flex;
			gap: 15px;
			overflow-y: auto;
			overflow-x: scroll;
			padding: 20px 0;

			&::-webkit-scrollbar {
				display: none;
			}
		}
	}
`;

export default StyledMovieDetails;

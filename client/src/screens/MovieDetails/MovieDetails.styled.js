import styled from "styled-components";

const StyledMovieDetails = styled.div`
	color: white;

	.details {
		display: flex;
		justify-content: center;
		gap: 70px;
		margin-bottom: 50px;

		@media only screen and (max-width: 768px) {
			flex-direction: column;
			align-items: center;
			gap: 30px;
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

			button:hover {
				background: orange;
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

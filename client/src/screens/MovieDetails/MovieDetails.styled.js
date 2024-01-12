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
		}

		&-img {
			max-width: 33%;
			min-width: 33%;
			text-align: right;

			@media only screen and (max-width: 768px) {
				max-width: 50%;
			}

			img {
				width: 100%;
				max-width: 400px;
			}
		}

		&-content {
			max-width: 50%;
			min-width: 50%;
			color: #fff;
			display: flex;
			flex-direction: column;
			gap: 20px;
			font-size: 1.25rem;

			@media only screen and (max-width: 768px) {
				max-width: 100%;
			}

			h2 {
				color: orange;
				font-size: 3rem;
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
				gap: 10px;
				flex-wrap: wrap;
			}

			&--genre {
				font-size: 1rem;
				padding: 10px 15px;
				background: #192133;
				border-radius: 10px;
			}

			button {
				font-size: 1.25rem;
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

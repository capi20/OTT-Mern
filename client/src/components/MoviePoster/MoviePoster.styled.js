import styled from "styled-components";

export const Wrapper = styled.div`
	.row__poster {
		cursor: pointer;
		position: relative;
		transition: transform 450ms;
		max-height: 300px;

		&:hover {
			transform: ${(props) => (props.isLoaded ? "scale(1.07)" : "none")};
			z-index: 9;
		}

		&-img {
			width: 180px;
			height: 270px;

			@media only screen and (max-width: 768px) {
				width: 140px;
				height: 210px;
			}

			img {
				object-fit: contain;
				border-radius: 10px;
			}
		}

		&-action {
			position: absolute;
			bottom: 0;
			background: black;
			opacity: 0.9;
			width: 100%;
			padding: 6px 0;
			display: flex;
			justify-content: space-around;
			visibility: hidden;
			border-bottom-right-radius: 10px;
			border-bottom-left-radius: 10px;
		}

		&:hover .row__poster-action {
			visibility: visible;
		}
	}
`;

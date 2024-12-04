import styled from "styled-components";

export const Wrapper = styled.div`
	.movie__poster {
		cursor: pointer;
		position: relative;
		transition: transform 450ms;
		max-height: 300px;

		&:hover {
			transform: ${(props) => (props.isLoaded ? "scale(1.05)" : "none")};
			z-index: 9;
		}

		&-actions {
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

		&:hover .movie__poster-actions {
			visibility: visible;
		}
	}
`;

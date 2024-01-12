import styled from "styled-components";

export const StyledModal = styled.div.attrs({
	className: "modal"
})`
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	z-index: 99;
	min-width: 80vw;
	border: none;
	background-color: white;
	transition: all 0.3s ease-out;

	@media only screen and (min-width: 990px) {
		min-width: 60vw;
	}

	@media only screen and (min-width: 1200px) {
		min-width: 50vw;
	}
`;

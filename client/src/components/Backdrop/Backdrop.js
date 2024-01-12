import React from "react";

import styled from "styled-components";

const StyledBackdrop = styled.div`
	width: 100%;
	height: 100%;
	position: fixed;
	z-index: 98;
	left: 0;
	top: 0;
	background-color: ${(props) =>
		props.isTransparent ? "transparent" : "rgba(0, 0, 0, 0.8)"};
`;

const Backdrop = ({ isOpen, close, transparent = false }) => {
	return isOpen ? (
		<StyledBackdrop
			onClick={close}
			isTransparent={transparent}></StyledBackdrop>
	) : null;
};

export default Backdrop;

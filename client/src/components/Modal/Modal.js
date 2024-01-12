import React from "react";

import { StyledModal } from "./Modal.styled";
import BackDrop from "../Backdrop/Backdrop";

function Modal({ isOpen, close, children }) {
	return (
		<>
			<BackDrop isOpen={isOpen} close={close} />
			<StyledModal
				style={{
					display: isOpen ? "block" : "none",
					opacity: isOpen ? "1" : "0"
				}}>
				{children}
			</StyledModal>
		</>
	);
}

export default Modal;

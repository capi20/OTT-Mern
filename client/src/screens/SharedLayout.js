import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Header from "../components/Header/Header";
import Modal from "../components/Modal/Modal";
import { useAppContext } from "../context/AppContext";

const SharedLayout = () => {
	const {
		isModalOpen,
		modalBody,
		closeModal,
		showAlert,
		clearAlert,
		alertType,
		alertMsg
	} = useAppContext();

	const location = useLocation();

	useEffect(() => {
		clearAlert(0);
	}, [location.pathname]);

	return (
		<div
			style={{
				minHeight: "100vh",
				maxWidth: "1440px",
				margin: "auto",
				backgroundColor: "#192133"
			}}>
			<Header />
			<main
				style={{
					minHeight: "100vh"
				}}>
				<Outlet />

				<Modal isOpen={isModalOpen} close={closeModal}>
					{modalBody}
				</Modal>
				{showAlert && (
					<Snackbar
						open={showAlert}
						autoHideDuration={5000}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "center"
						}}>
						<Alert
							severity={alertType ? alertType : "success"}
							sx={{ width: "100%" }}>
							{alertMsg}
						</Alert>
					</Snackbar>
				)}
			</main>
		</div>
	);
};
export default SharedLayout;

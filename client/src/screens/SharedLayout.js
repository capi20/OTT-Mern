import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Header from "../components/Header/Header";
import Modal from "../components/Modal/Modal";
import { useAppContext } from "../context/AppContext";
import { poster_url } from "../Requests";

const SharedLayout = () => {
	const {
		isModalOpen,
		modalBody,
		closeModal,
		showAlert,
		clearAlert,
		alertType,
		alertMsg,
		bgImage,
		updateBgImage
	} = useAppContext();

	const location = useLocation();

	useEffect(() => {
		updateBgImage("");
		clearAlert(0);
	}, [location.pathname]);

	return (
		<>
			<Header />
			<main
				style={{
					minHeight: "100vh",
					backgroundImage: bgImage
						? `linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9)), url("${poster_url}${bgImage}")`
						: "none",
					backgroundSize: "cover",
					backgroundPosition: "center center",
					height: "100%",
					backgroundColor: "#192133"
				}}>
				<Outlet />

				<Modal isOpen={isModalOpen} close={closeModal}>
					{modalBody}
				</Modal>
				{showAlert && (
					<Snackbar
						open={showAlert}
						autoHideDuration={5000}
						anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
						<Alert
							severity={alertType ? alertType : "success"}
							sx={{ width: "100%" }}>
							{alertMsg}
						</Alert>
					</Snackbar>
				)}
			</main>
		</>
	);
};
export default SharedLayout;

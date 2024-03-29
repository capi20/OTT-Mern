import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Header from "../components/Header/Header";
import Modal from "../components/Modal/Modal";
import { useAppContext } from "../context/AppContext";
import { backdrop_url, poster_url } from "../Requests";

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
					minHeight: "100vh",
					backgroundImage: bgImage
						? `linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9)), url("${backdrop_url}${bgImage}")`
						: "none",
					backgroundSize: "cover",
					backgroundPosition: "center center",
					height: "100%"
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
		</div>
	);
};
export default SharedLayout;

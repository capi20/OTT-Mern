import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const ProtectedRoute = ({ children }) => {
	const { userLoading, user } = useAppContext();

	if (userLoading) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh"
				}}>
				<CircularProgress />
			</Box>
		);
	}

	if (!user) {
		return <Navigate to="/login" />;
	}

	return children;
};
export default ProtectedRoute;

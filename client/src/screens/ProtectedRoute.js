import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Skeleton } from "@mui/material";

const ProtectedRoute = ({ children }) => {
	const { userLoading, user } = useAppContext();

	if (userLoading) {
		return (
			<Skeleton
				variant="rectangular"
				animation="wave"
				height="100%"
				width="100%"
			/>
		);
	}

	if (!user) {
		return <Navigate to="/login" />;
	}

	return children;
};
export default ProtectedRoute;

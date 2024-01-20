import { Route, Routes } from "react-router-dom";

import HomeScreen from "./HomeScreen";
import SearchScreen from "./SearchScreen";
import LoginScreen from "./LoginScreen/LoginScreen";
import styled from "styled-components";
import ProtectedRoute from "./ProtectedRoute";
import SharedLayout from "./SharedLayout";
import MovieDetails from "./MovieDetails/MovieDetails";
import Account from "./Account/Account";

const StyledRoot = styled.div`
	background-color: #192133;
	min-height: 100vh;
`;

const Main = () => {
	return (
		<StyledRoot>
			<Routes>
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<SharedLayout />
						</ProtectedRoute>
					}>
					<Route index element={<HomeScreen />} />
					<Route path="browse" element={<SearchScreen isSearch={false} />} />
					<Route path="details/:id" element={<MovieDetails />} />
					<Route path="account" element={<Account />} />
				</Route>
				<Route path="login" element={<LoginScreen />} />
			</Routes>
		</StyledRoot>
	);
};

export default Main;

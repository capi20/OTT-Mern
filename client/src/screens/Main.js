import { Route, Routes } from "react-router-dom";

import HomeScreen from "./HomeScreen";
import SearchScreen from "./SearchScreen";
import LoginScreen from "./LoginScreen/LoginScreen";
import styled from "styled-components";
import ProtectedRoute from "./ProtectedRoute";
import SharedLayout from "./SharedLayout";
import MovieDetails from "./MovieDetails/MovieDetails";
import Account from "./Account/Account";
import NotFound from "../components/NotFound";

const StyledRoot = styled.div`
	background-color: #192133;
	min-height: 100vh;
	min-height: 100svh;
	color: #fff;
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
					<Route path="search/:id" element={<SearchScreen />} />
					<Route path="genre/:id" element={<SearchScreen />} />
					<Route path="watchlist" element={<SearchScreen />} />
					<Route path="details/:id" element={<MovieDetails />} />
					<Route path="account" element={<Account />} />
				</Route>
				<Route path="login" element={<LoginScreen />} />
				<Route path="*" element={<NotFound message={"Page not Found"} />} />
			</Routes>
		</StyledRoot>
	);
};

export default Main;

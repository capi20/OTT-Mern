import { useParams } from "react-router-dom";

import MoviePoster from "../components/MoviePoster/MoviePoster";
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";
import { searchAPI } from "../Requests";
import { movieDBInstance } from "../axios";
import NotFound from "../components/NotFound";
import SectionWrapper from "../hoc/PageWrapper";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const StyledSearchScreen = styled.div`
	color: white;

	.search-movie-wrapper {
		padding: 30px 0;
		display: flex;
		flex-wrap: wrap;
		gap: 30px;
		justify-content: center;
	}

	p {
		font-size: 24px;
	}
`;

const SearchScreen = () => {
	const params = useParams();
	const { isLoading, apiStart, apiSuccess, displayAlert } = useAppContext();
	const [searchResult, setSearchResult] = useState(null);

	useEffect(() => {
		const searchMovie = async (query) => {
			apiStart();
			setSearchResult(null);
			try {
				const request = await movieDBInstance.get(
					`${searchAPI}&query=${query}&page=1`
				);
				const data = request.data.results.length ? request.data.results : "";
				setSearchResult(data);
				apiSuccess();
			} catch (error) {
				displayAlert("Something went wrong!");
			}
		};

		searchMovie(params.id);
	}, [params.id]);

	return (
		<StyledSearchScreen>
			<p className="mb-3">
				Searched for: <span className="color-primary">{params.id}</span>
			</p>

			{searchResult?.length > 0 ? (
				<div className="search-movie-wrapper">
					{searchResult.map((movie) => (
						<MoviePoster key={movie.id} movie={movie} />
					))}
				</div>
			) : !isLoading ? (
				<NotFound
					message={
						searchResult?.length === 0
							? "Oops! No result found"
							: "Something went wrong!"
					}
					notFound={!searchResult ? true : false}
				/>
			) : (
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "200px"
					}}>
					<CircularProgress sx={{ color: "orange" }} />
				</Box>
			)}
		</StyledSearchScreen>
	);
};

export default SectionWrapper(SearchScreen);

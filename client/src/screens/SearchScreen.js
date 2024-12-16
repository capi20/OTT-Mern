import { useRef, useCallback, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import MoviePoster from "../components/MoviePoster/MoviePoster";
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";
import { genreMap, searchAPI } from "../Requests";
import { movieDBInstance } from "../axios";
import NotFound from "../components/NotFound";
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
`;

const SearchScreen = () => {
	const params = useParams();
	const location = useLocation();
	const isSearch = location.pathname.includes("search");
	const isGenre = location.pathname.includes("genre");
	const isWatchlist = location.pathname.includes("watchlist");
	const { isLoading, apiStart, apiSuccess, displayAlert, watchList } =
		useAppContext();
	const [searchResult, setSearchResult] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);
	const [hasMore, setHasMore] = useState(false);
	const [resetFlag, setResetFlag] = useState(false);

	console.log(isWatchlist);

	const api = isSearch
		? `${searchAPI}&query=${params.id}`
		: isGenre
		? `/discover/movie?with_genres=${params.id}`
		: "";

	useEffect(() => {
		setPageNumber(1);
		setSearchResult([]);
		setResetFlag(!resetFlag);
	}, [params.id]);

	useEffect(() => {
		const searchMovie = async () => {
			apiStart();
			try {
				const res = await movieDBInstance.get(
					`${api}&page=${pageNumber}`
				);
				const data = res.data.results.length ? res.data.results : [];
				setSearchResult([...searchResult, ...data]);
				setHasMore(res.data.results.length > 0);
				apiSuccess();
			} catch (error) {
				displayAlert("Something went wrong!");
			}
		};

		if (isSearch || isGenre) {
			searchMovie();
		}
	}, [resetFlag, pageNumber]);

	const observer = useRef();
	const lastMovieRef = useCallback(
		(node) => {
			if (isLoading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPageNumber((prevPageNumber) => prevPageNumber + 1);
				}
			});
			if (node) observer.current.observe(node);
		},
		[isLoading, hasMore]
	);

	return (
		<StyledSearchScreen className="app-padding">
			<h1 className="page-heading">
				{isSearch && (
					<>
						Results for{" "}
						<span className="color-primary">"{params.id}"</span>
					</>
				)}
				{isGenre && `${genreMap[params.id]}`}
				{isWatchlist && `Watchlist`}
			</h1>

			{isLoading && (
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

			{(isSearch || isGenre) && searchResult?.length > 0 && (
				<div className="search-movie-wrapper">
					{searchResult.map((movie, i) => {
						if (searchResult.length === i + 1) {
							return (
								<div ref={lastMovieRef}>
									<MoviePoster key={movie.id} movie={movie} />
								</div>
							);
						} else {
							return <MoviePoster key={movie.id} movie={movie} />;
						}
					})}
				</div>
			)}

			{isWatchlist && Object.keys(watchList).length > 0 && (
				<div className="search-movie-wrapper">
					{Object.keys(watchList).map((id) => {
						return (
							<MoviePoster
								key={id}
								movie={{
									id,
									poster_path: watchList[id]
								}}
							/>
						);
					})}
				</div>
			)}

			{!isLoading &&
				(isSearch || isGenre) &&
				searchResult?.length === 0 && (
					<NotFound
						message={"Oops! No result found"}
						notFound={false}
					/>
				)}

			{!isLoading &&
				isWatchlist &&
				Object.keys(watchList).length === 0 && (
					<NotFound
						message={"Your Watchlist is currently empty"}
						notFound={false}
					/>
				)}
		</StyledSearchScreen>
	);
};

export default SearchScreen;

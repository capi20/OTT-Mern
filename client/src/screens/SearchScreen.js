import { useRef, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import MoviePoster from "../components/MoviePoster/MoviePoster";
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";
import { genreMap, searchAPI } from "../Requests";
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

	h2 {
		font-weight: 600;
	}
`;

const SearchScreen = () => {
	const [searchParams] = useSearchParams();
	const searchQuery = searchParams.get("search");
	const searchGenre = searchParams.get("genre");
	const inValidSearch =
		(searchQuery && searchGenre) || !(searchQuery || searchGenre);
	const { isLoading, apiStart, apiSuccess, displayAlert } = useAppContext();
	const [searchResult, setSearchResult] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);
	const [hasMore, setHasMore] = useState(false);
	const [resetFlag, setResetFlag] = useState(false);

	const api = searchQuery
		? `${searchAPI}&query=${searchQuery}`
		: `/discover/movie?with_genres=${searchGenre}`;

	useEffect(() => {
		setPageNumber(1);
		setSearchResult([]);
		setResetFlag(!resetFlag);
	}, [searchQuery]);

	useEffect(() => {
		const searchMovie = async () => {
			apiStart();
			try {
				const res = await movieDBInstance.get(`${api}&page=${pageNumber}`);
				const data = res.data.results.length ? res.data.results : [];
				setSearchResult([...searchResult, ...data]);
				setHasMore(res.data.results.length > 0);
				apiSuccess();
			} catch (error) {
				displayAlert("Something went wrong!");
			}
		};

		if (!inValidSearch) {
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
		<StyledSearchScreen>
			<h2>
				{!inValidSearch && searchQuery && (
					<>
						Results for <span className="color-primary">"{searchQuery}"</span>
					</>
				)}
				{!inValidSearch && searchGenre && `${genreMap[searchGenre]}`}
			</h2>

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

			{searchResult?.length > 0 && (
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

			{(inValidSearch || (!isLoading && searchResult?.length === 0)) && (
				<NotFound message={"Oops! No result found"} notFound={false} />
			)}
		</StyledSearchScreen>
	);
};

export default SectionWrapper(SearchScreen);

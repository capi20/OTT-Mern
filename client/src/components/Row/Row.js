import React, { useState, useEffect, useLayoutEffect } from "react";

import { movieDBInstance } from "../../axios";
import MoviePoster from "../MoviePoster/MoviePoster";
import { StyledRow } from "./Row.styled";
import { Skeleton } from "@mui/material";
import { useAppContext } from "../../context/AppContext";

function Row({ title, fetchUrl }) {
	const [movies, setMovies] = useState([]);
	const [SkeletonCount, setSkeletonCount] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	useLayoutEffect(() => {
		let count = Math.floor(window.innerWidth / 200);
		setSkeletonCount(count);
	}, []);

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true);
			try {
				const request = await movieDBInstance.get(fetchUrl);
				setMovies(request.data.results);
			} catch (error) {
			} finally {
				setIsLoading(false);
			}
		}

		fetchData();
	}, []);

	return (
		<StyledRow>
			{isLoading ? (
				<>
					{Array.from(Array(SkeletonCount), (e, i) => {
						return (
							<Skeleton
								key={i}
								variant="rectangular"
								animation="wave"
								height="300px"
								width="100%"
							/>
						);
					})}
				</>
			) : movies.length > 0 ? (
				<>
					<h2>{title}</h2>
					<div className="row__posters">
						{movies.map(
							(movie) =>
								movie.poster_path && (
									<MoviePoster key={movie.id} movie={movie} />
								)
						)}
					</div>
				</>
			) : (
				""
			)}
		</StyledRow>
	);
}

export default Row;

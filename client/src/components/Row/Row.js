import React, { useState, useEffect, useLayoutEffect } from "react";

import { movieDBInstance } from "../../axios";
import MoviePoster from "../MoviePoster/MoviePoster";
import { StyledRow } from "./Row.styled";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

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
				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
			}
		}

		fetchData();
	}, []);

	return (
		<StyledRow>
			{isLoading && (
				<>
					<h2>{title}</h2>
					<div className="row-posters">
						{Array.from(Array(SkeletonCount), (e, i) => {
							return (
								<Skeleton
									key={i}
									variant="rectangular"
									animation="wave"
									height="300px"
									width="200px"
								/>
							);
						})}
					</div>
				</>
			)}
			{movies.length > 0 && (
				<>
					<div className="row-heading">
						<h2>{title}</h2>
						{fetchUrl.includes("with_genres") && (
							<Link
								to={{
									pathname: "/browse",
									search: `?genre=${fetchUrl.split("=")[1]}`
								}}>
								<span>See more </span>
								<NavigateNextIcon />
							</Link>
						)}
					</div>
					<div className="row-posters">
						{movies.map(
							(movie) =>
								movie.poster_path && (
									<MoviePoster key={movie.id} movie={movie} />
								)
						)}
					</div>
				</>
			)}
		</StyledRow>
	);
}

export default Row;

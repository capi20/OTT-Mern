import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { movieDBInstance } from "../../axios";
import { trendingAPI } from "../../Requests";
import { StyledBanner } from "./Banner.styled";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoIcon from "@mui/icons-material/Info";
import { useAppContext } from "../../context/AppContext";
import { Skeleton } from "@mui/material";

const Banner = ({}) => {
	const navigate = useNavigate();
	const [movie, setMovie] = useState(null);
	const { fetchMovieVideos } = useAppContext();

	useEffect(() => {
		async function fetchData() {
			const request = await movieDBInstance.get(trendingAPI);
			setMovie(
				request.data.results[
					Math.floor(Math.random() * request.data.results.length - 1)
				]
			);
			return request;
		}

		fetchData();
	}, []);

	return (
		<StyledBanner
			style={{
				backgroundImage: movie
					? `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`
					: "none"
			}}>
			{movie ? (
				<div className="banner">
					<div className="banner__content">
						<h1 className="banner__content-title mb-3">
							{movie?.title || movie?.name || movie?.original_name}
						</h1>
						<div className="banner__content-buttons">
							<button
								className="banner__content-button btn"
								onClick={() => fetchMovieVideos(movie.id)}>
								<PlayArrowIcon />
								<span>Play</span>
							</button>
							<button
								className="banner__content-button btn"
								onClick={() => navigate(`/details/${movie.id}`)}>
								<InfoIcon />
								<span>More Info</span>
							</button>
						</div>
					</div>
				</div>
			) : (
				<Skeleton
					variant="rectangular"
					animation="wave"
					height="100%"
					width="100%"
				/>
			)}

			{/* <div className="banner-bottom" /> */}
		</StyledBanner>
	);
};

export default Banner;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "./MoviePoster.styled";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoIcon from "@mui/icons-material/Info";
import { useAppContext } from "../../context/AppContext";
import { poster_url } from "../../Requests";
import { Skeleton } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import AddIcon from "@mui/icons-material/Add";

const MoviePoster = ({ movie }) => {
	const navigate = useNavigate();
	const { fetchMovieVideos, updateWatchList, watchList } = useAppContext();
	const [imageLoaded, setImageLoaded] = useState(false);

	useEffect(() => {
		const img = new Image();
		img.onload = () => {
			setImageLoaded(true);
		};
		img.src = `${poster_url}${movie.poster_path}`;
	}, [movie.poster_path]);

	return (
		<>
			{movie.poster_path && (
				<>
					<Wrapper isLoaded={imageLoaded}>
						<div className="row__poster">
							<div className="row__poster-img">
								<Skeleton
									variant="rectangular"
									animation="wave"
									height="100%"
									width="100%"
									sx={{ display: imageLoaded ? "none" : "block" }}
								/>
								<img
									style={{ display: imageLoaded ? "block" : "none" }}
									src={`${poster_url}${movie.poster_path}`}
									alt={movie.id}
									onClick={() => navigate(`/details/${movie.id}`)}
									loading="lazy"
									height="100%"
									width="100%"
								/>
							</div>
							{imageLoaded && (
								<div className="row__poster-action">
									<button
										className="round-button"
										onClick={() => fetchMovieVideos(movie.id)}>
										<PlayArrowIcon />
									</button>
									<button
										className="round-button"
										onClick={() => navigate(`/details/${movie.id}`)}>
										<InfoIcon />
									</button>
									<button
										className="round-button"
										onClick={() =>
											updateWatchList(movie.id, movie.poster_path)
										}>
										{Object.keys(watchList).includes(`${movie.id}`) ? (
											<DoneIcon />
										) : (
											<AddIcon />
										)}
									</button>
								</div>
							)}
						</div>
					</Wrapper>
				</>
			)}
		</>
	);
};

export default MoviePoster;

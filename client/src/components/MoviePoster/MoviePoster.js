import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Wrapper } from "./MoviePoster.styled";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoIcon from "@mui/icons-material/Info";
import { useAppContext } from "../../context/AppContext";
import DoneIcon from "@mui/icons-material/Done";
import AddIcon from "@mui/icons-material/Add";
import ImageComponent from "../ImageComponent";

const MoviePoster = ({ movie }) => {
	const navigate = useNavigate();
	const { fetchMovieVideos, updateWatchList, watchList } = useAppContext();
	const [imageLoaded, setImageLoaded] = useState(false);

	return (
		<>
			{movie.poster_path && (
				<>
					<Wrapper isLoaded={imageLoaded}>
						<div className="movie__poster">
							<Link to={`/details/${movie.id}`}>
								<ImageComponent
									src={`${movie.poster_path}`}
									alt={movie.original_title}
									imageLoaded={imageLoaded}
									setImageLoaded={setImageLoaded}
								/>
							</Link>
							{imageLoaded && (
								<div className="movie__poster-actions">
									<button
										className="round-button"
										onClick={() =>
											fetchMovieVideos(movie.id)
										}>
										<PlayArrowIcon />
									</button>
									<button
										className="round-button"
										onClick={() =>
											navigate(`/details/${movie.id}`)
										}>
										<InfoIcon />
									</button>
									<button
										className="round-button"
										onClick={() =>
											updateWatchList(
												movie.id,
												movie.poster_path
											)
										}>
										{Object.keys(watchList).includes(
											`${movie.id}`
										) ? (
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

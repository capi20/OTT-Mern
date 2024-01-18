import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "./MoviePoster.styled";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppContext } from "../../context/AppContext";
import { poster_url } from "../../Requests";
import { Skeleton } from "@mui/material";

const MoviePoster = ({ movie }) => {
	const navigate = useNavigate();
	const [like, setLike] = useState(false);
	const { fetchMovieVideos, apiStart, apiSuccess, displayAlert } =
		useAppContext();
	const [imageLoaded, setImageLoaded] = useState(false);

	useEffect(() => {
		const img = new Image();
		img.onload = () => {
			setImageLoaded(true);
		};
		img.src = `${poster_url}${movie.poster_path}`;
	}, [movie.poster_path]);

	// const updateWatchlist = async (movieId, banner) => {
	// 	setLike(!like);
	// 	apiStart();

	// 	try {
	// 		await serverInstance.patch("/watchlist/addMovie", { movieId, banner });
	// 		apiSuccess();
	// 	} catch (error) {
	// 		displayAlert("Something went wrong");
	// 	}
	// };

	return (
		<>
			{movie.poster_path && (
				<>
					<Wrapper>
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
									alt={movie.name}
									onClick={() => navigate(`/details/${movie.id}`)}
									loading="lazy"
									height="100%"
									width="100%"
								/>
							</div>
							{imageLoaded && (
								<div className="row__poster-action">
									<PlayArrowIcon onClick={() => fetchMovieVideos(movie.id)} />
									<InfoIcon onClick={() => navigate(`/details/${movie.id}`)} />
									<FavoriteIcon
										className={like ? "like" : ""}
										onClick={() => {
											//updateWatchlist(movie.id, movie.poster_path);
										}}
									/>
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

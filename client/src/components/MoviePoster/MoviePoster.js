import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "./MoviePoster.styled";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppContext } from "../../context/AppContext";
import { poster_url } from "../../Requests";

const MoviePoster = ({ movie }) => {
	const navigate = useNavigate();
	const [like, setLike] = useState(false);
	const { fetchMovieVideos } = useAppContext();

	return (
		<>
			{movie.poster_path && (
				<>
					<Wrapper>
						<div className="row__poster">
							<img
								className="row__poster-img"
								key={movie.id}
								src={`${poster_url}${movie.poster_path}`}
								alt={movie.name}
								onClick={() => navigate(`/details/${movie.id}`)}
								loading="lazy"
							/>
							<div className="row__poster-action">
								<PlayArrowIcon onClick={() => fetchMovieVideos(movie.id)} />
								<InfoIcon onClick={() => navigate(`/details/${movie.id}`)} />
								<FavoriteIcon
									className={like ? "like" : ""}
									onClick={() => setLike(!like)}
								/>
							</div>
						</div>
					</Wrapper>
				</>
			)}
		</>
	);
};

export default MoviePoster;

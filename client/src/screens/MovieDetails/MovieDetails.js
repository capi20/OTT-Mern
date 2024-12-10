import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { movieDBInstance } from "../../axios";
import StyledMovieDetails from "./MovieDetails.styled";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StarIcon from "@mui/icons-material/Star";
import { useAppContext } from "../../context/AppContext";
import { Skeleton } from "@mui/material";
import Row from "../../components/Row/Row";
import NotFound from "../../components/NotFound";
import DoneIcon from "@mui/icons-material/Done";
import AddIcon from "@mui/icons-material/Add";
import { StyledRow } from "../../components/Row/Row.styled";
import CastPoster from "../../components/CastPoster/CastPoster";
import { backdrop_url } from "../../Requests";
import ImageComponent from "../../components/ImageComponent";

const MovieDetails = () => {
	const params = useParams();
	const [details, setDetails] = useState(null);
	const [movieCast, setMovieCast] = useState([]);
	const [imageLoaded, setImageLoaded] = useState(false);
	const {
		isLoading,
		fetchMovieVideos,
		apiStart,
		apiSuccess,
		displayAlert,
		watchList,
		updateWatchList
	} = useAppContext();

	useEffect(() => {
		fetchData();
	}, [params.id]);

	async function fetchData() {
		apiStart();
		setDetails(null);
		setMovieCast([]);
		try {
			let response = await movieDBInstance.get(`/movie/${params.id}`);
			let castResponse = await movieDBInstance.get(
				`/movie/${params.id}/credits`
			);

			setDetails(response.data);
			setMovieCast(castResponse.data?.cast || []);
			apiSuccess();
		} catch (error) {
			displayAlert("Something went wrong!");
		}
	}

	return (
		<StyledMovieDetails
			className="app-padding"
			style={{
				backgroundImage: details?.backdrop_path
					? `linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9)), url("${backdrop_url}${details.backdrop_path}")`
					: "none"
			}}>
			{!isLoading && !details ? (
				<NotFound message="Something went wrong!" notFound={false} />
			) : (
				<>
					<div className="details">
						<div className="details-img">
							{isLoading ? (
								<Skeleton
									variant="rectangular"
									animation="wave"
									height="400px"
									width="100%"
								/>
							) : (
								<ImageComponent
									src={`${details?.poster_path}`}
									alt={details?.original_title}
									imageLoaded={imageLoaded}
									setImageLoaded={setImageLoaded}
									posterImage={false}
								/>
							)}
						</div>
						<div className="details-content">
							{isLoading ? (
								<>
									<Skeleton
										variant="text"
										animation="wave"
										width="100%"
									/>
									<Skeleton
										variant="rectangular"
										animation="wave"
										height={100}
										width="100%"
									/>
									<Skeleton
										variant="text"
										animation="wave"
										width="200px"
									/>
									<Skeleton
										variant="text"
										animation="wave"
										width="100%"
									/>
									<Skeleton
										variant="text"
										animation="wave"
										width="100px"
									/>
									<Skeleton
										variant="rectangular"
										animation="wave"
										width={230}
										height={53}
									/>
								</>
							) : (
								<>
									{details?.title && (
										<h1 className="movie-title color-primary">
											{details.title}
										</h1>
									)}
									{details?.overview && (
										<p>{details.overview}</p>
									)}
									{(details?.release_date ||
										details?.runtime) && (
										<p className="details-content--length">
											{details.release_date}
											{details?.runtime && (
												<span>
													&nbsp;&nbsp;&nbsp;&nbsp;
													{`${Math.floor(
														details?.runtime / 60
													)} h ${
														details?.runtime % 60
													} min`}
												</span>
											)}
										</p>
									)}
									{details?.genres && (
										<div className="details-content--genres">
											{details.genres.map((genre) => (
												<Link
													key={genre.id}
													className="details-content--genre"
													to={{
														pathname: `/genre/${genre.id}`
													}}>
													{genre.name}
												</Link>
											))}
										</div>
									)}
									{details?.vote_average && (
										<div className="details-content--rating">
											<StarIcon />
											<span className="mt-1">
												{details?.vote_average?.toFixed(
													1
												)}{" "}
												/ 10
											</span>
										</div>
									)}
									{details?.id && (
										<div className="details-content--btns">
											<button
												className="btn"
												onClick={() =>
													fetchMovieVideos(details.id)
												}>
												Watch Trailer
												<PlayArrowIcon />
											</button>
											<button
												className="round-button"
												onClick={() =>
													updateWatchList(
														params.id,
														details?.poster_path
													)
												}>
												{Object.keys(
													watchList
												).includes(params.id) ? (
													<DoneIcon />
												) : (
													<AddIcon />
												)}
											</button>
										</div>
									)}
								</>
							)}
						</div>
					</div>
					{movieCast.length > 0 && (
						<StyledRow>
							<div className="row-heading">
								<h2>Cast</h2>
							</div>
							<div className="row-posters">
								{movieCast.map((cast) => {
									return (
										<CastPoster
											profile={`${cast.profile_path}`}
											name={cast.name}
										/>
									);
								})}
							</div>
						</StyledRow>
					)}
					{details && (
						<Row
							title="Customer also watched"
							fetchUrl={`/movie/${params.id}/similar`}
						/>
					)}
				</>
			)}
		</StyledMovieDetails>
	);
};
export default MovieDetails;

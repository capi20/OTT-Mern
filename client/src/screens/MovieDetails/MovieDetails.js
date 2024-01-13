import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieDBInstance } from "../../axios";
import { poster_url } from "../../Requests";
import StyledMovieDetails from "./MovieDetails.styled";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StarIcon from "@mui/icons-material/Star";
import { useAppContext } from "../../context/AppContext";
import { Skeleton } from "@mui/material";
import Row from "../../components/Row/Row";
import NotFound from "../../components/NotFound";
import SectionWrapper from "../../hoc/PageWrapper";

const MovieDetails = () => {
	const params = useParams();
	const [details, setDetails] = useState(null);
	const {
		isLoading,
		fetchMovieVideos,
		apiStart,
		apiSuccess,
		apiError,
		updateBgImage
	} = useAppContext();

	useEffect(() => {
		fetchData();
	}, [params.id]);

	async function fetchData() {
		apiStart();
		setDetails(null);
		try {
			let response = await movieDBInstance.get(`/movie/${params.id}`);

			setDetails(response.data);
			updateBgImage(response.data?.backdrop_path);
			apiSuccess();
		} catch (error) {
			apiError("Something went wrong!");
		}
	}

	return (
		<StyledMovieDetails>
			<div className="details-wrapper">
				{!isLoading && !details ? (
					<NotFound message="Something went wrong!" notFound={false} />
				) : (
					<>
						<div className="details">
							<div className="details-img">
								{!isLoading ? (
									<img
										src={`${poster_url}${details?.poster_path}`}
										alt={details?.original_title}
									/>
								) : (
									<Skeleton
										variant="rectangular"
										animation="wave"
										height="500px"
										width="100%"
									/>
								)}
							</div>
							<div className="details-content">
								{isLoading ? (
									<>
										<Skeleton variant="text" animation="wave" width="100%" />
										<Skeleton
											variant="rectangular"
											animation="wave"
											height={100}
											width="100%"
										/>
										<Skeleton variant="text" animation="wave" width="100%" />
										<Skeleton variant="text" animation="wave" width="100%" />
										<Skeleton variant="text" animation="wave" width="100%" />
										<Skeleton
											variant="rectangular"
											animation="wave"
											width={230}
											height={53}
										/>
									</>
								) : (
									<>
										{details?.title && <h2>{details.title}</h2>}
										{details?.overview && <p>{details.overview}</p>}
										{details?.release_date ||
											(details?.runtime && (
												<p className="details-content--length">
													{details.release_date}
													{details?.runtime && (
														<span>
															&nbsp;&nbsp;&nbsp;&nbsp;
															{`${Math.floor(details?.runtime / 60)} h ${
																details?.runtime % 60
															} min`}
														</span>
													)}
												</p>
											))}
										{details?.genres && (
											<div className="details-content--genres">
												{details.genres.map((genre) => (
													<div
														className="details-content--genre"
														key={genre.id}>
														{genre.name}
													</div>
												))}
											</div>
										)}
										{details?.vote_average && (
											<div className="details-content--rating">
												<span className="mt-1">
													{details?.vote_average?.toFixed(1)}
												</span>{" "}
												<StarIcon />
											</div>
										)}
										{details?.id && (
											<button
												className="btn"
												onClick={() => fetchMovieVideos(details.id)}>
												Watch Trailer
												<PlayCircleIcon />
											</button>
										)}
									</>
								)}
							</div>
						</div>
						<div className="recommend">
							<Row
								title="Customer also watched"
								fetchUrl={`/movie/${params.id}/recommendations`}
							/>
						</div>
					</>
				)}
			</div>
		</StyledMovieDetails>
	);
};
export default SectionWrapper(MovieDetails);

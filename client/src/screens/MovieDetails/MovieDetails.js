import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { movieDBInstance } from "../../axios";
import { poster_url } from "../../Requests";
import StyledMovieDetails from "./MovieDetails.styled";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StarIcon from "@mui/icons-material/Star";
import { useAppContext } from "../../context/AppContext";
import { Skeleton } from "@mui/material";
import Row from "../../components/Row/Row";
import NotFound from "../../components/NotFound";
import SectionWrapper from "../../hoc/PageWrapper";
import DoneIcon from "@mui/icons-material/Done";
import AddIcon from "@mui/icons-material/Add";

const MovieDetails = () => {
	const params = useParams();
	const [details, setDetails] = useState(null);
	const {
		isLoading,
		fetchMovieVideos,
		apiStart,
		apiSuccess,
		displayAlert,
		updateBgImage,
		watchList,
		updateWatchList
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
			displayAlert("Something went wrong!");
		}
	}

	return (
		<StyledMovieDetails>
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
								<img
									src={`https://image.tmdb.org/t/p/w500${details?.poster_path}`}
									alt={details?.original_title}
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
									<Skeleton variant="text" animation="wave" width="200px" />
									<Skeleton variant="text" animation="wave" width="100%" />
									<Skeleton variant="text" animation="wave" width="100px" />
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
									{details?.overview && <p>{details.overview}</p>}
									{(details?.release_date || details?.runtime) && (
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
												{details?.vote_average?.toFixed(1)} / 10
											</span>
										</div>
									)}
									{details?.id && (
										<div className="details-content--btns">
											<button
												className="btn"
												onClick={() => fetchMovieVideos(details.id)}>
												Watch Trailer
												<PlayArrowIcon />
											</button>
											<button
												className="round-button"
												onClick={() =>
													updateWatchList(params.id, details?.poster_path)
												}>
												{Object.keys(watchList).includes(params.id) ? (
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
					{details && (
						<div className="recommend">
							<Row
								title="Customer also watched"
								fetchUrl={`/movie/${params.id}/similar`}
							/>
						</div>
					)}
				</>
			)}
		</StyledMovieDetails>
	);
};
export default SectionWrapper(MovieDetails);

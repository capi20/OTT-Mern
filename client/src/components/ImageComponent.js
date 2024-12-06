import styled from "styled-components";
import { poster_url } from "../Requests";
import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";

const StyledImage = styled.div`
	.image {
		width: 180px;
		height: 270px;
		object-fit: contain;
		border-radius: 10px;

		@media only screen and (max-width: 768px) {
			width: 140px;
			height: 210px;
		}
	}
`;

const ImageComponent = ({
	src,
	alt,
	imageLoaded,
	setImageLoaded,
	posterImage = true
}) => {
	// const [imageLoaded, setImageLoaded] = useState(false);
	const [imageSrc, setImageSrc] = useState(`${poster_url}${src}`);

	useEffect(() => {
		const img = new Image();
		img.onload = () => {
			setImageLoaded(true);
		};
		img.onerror = () => {
			setImageLoaded(true);
			setImageSrc("/pic_not_found.jpg");
		};
		img.src = `${poster_url}${src}`;
		setImageSrc(`${poster_url}${src}`);
	}, [src]);

	return (
		<StyledImage>
			{!imageLoaded && (
				<Skeleton
					variant="rectangular"
					animation="wave"
					className="image"
				/>
			)}
			<img
				className={posterImage ? "image" : ""}
				src={imageSrc}
				alt={alt}
				loading="lazy"
				style={{ display: imageLoaded ? "block" : "none" }}
			/>
		</StyledImage>
	);
};
export default ImageComponent;

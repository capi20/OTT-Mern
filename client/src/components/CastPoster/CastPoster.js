import { useState } from "react";
import ImageComponent from "../ImageComponent";
import { StyledCastPoster } from "./CastPoster.styled";

const CastPoster = ({ profile, name }) => {
	const [imageLoaded, setImageLoaded] = useState(false);
	return (
		<StyledCastPoster>
			<ImageComponent
				src={profile}
				alt={name}
				imageLoaded={imageLoaded}
				setImageLoaded={setImageLoaded}
			/>
			<p>{name}</p>
		</StyledCastPoster>
	);
};
export default CastPoster;

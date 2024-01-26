import styled from "styled-components";
import not_found_logo from "../images/not_found.svg";
import server_error_logo from "../images/server_error.svg";

const StyledNotFound = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	p {
		font-size: 20px;
		margin: 60px 0 30px;
	}
`;

const NotFound = ({ message, notFound }) => {
	return (
		<StyledNotFound>
			<p>{message}</p>
			<img
				src={notFound ? not_found_logo : server_error_logo}
				alt="not found"
				width="50%"
			/>
		</StyledNotFound>
	);
};
export default NotFound;

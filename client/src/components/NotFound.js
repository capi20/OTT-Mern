import styled from "styled-components";
import not_found_logo from "../images/not_found.svg";
import server_error_logo from "../images/server_error.svg";

const StyledNotFound = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 50px;
	font-size: 1.5rem;
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

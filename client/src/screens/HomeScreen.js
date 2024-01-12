import Banner from "../components/Banner/Banner";
import Row from "../components/Row/Row";
import requests from "../Requests";
import styled from "styled-components";

const StyledRows = styled.div`
	margin-top: -150px;
`;

const HomeScreen = () => {
	return (
		<>
			<Banner />
			<StyledRows>
				{requests.map((request) => (
					<Row key={request[0]} title={request[0]} fetchUrl={request[1]} />
				))}
			</StyledRows>
		</>
	);
};

export default HomeScreen;

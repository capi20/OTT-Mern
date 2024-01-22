import styled from "styled-components";

const StyledPageWrapper = styled.div`
	padding: 90px 60px 30px;

	@media only screen and (max-width: 768px) {
		padding: 90px 30px 30px;
	}

	@media only screen and (max-width: 540px) {
		padding: 90px 10px 30px;
	}
`;

const PageWrapper = (Component) =>
	function hoc() {
		return (
			<StyledPageWrapper>
				<Component />
			</StyledPageWrapper>
		);
	};

export default PageWrapper;

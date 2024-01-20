import styled from "styled-components";

const StyledPageWrapper = styled.div`
	padding: 110px 60px 30px;

	@media only screen and (max-width: 768px) {
		padding: 110px 30px 30px;
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

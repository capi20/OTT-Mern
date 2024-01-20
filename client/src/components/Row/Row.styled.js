import styled from "styled-components";

export const StyledRow = styled.div`
	color: white;

	h2 {
		font-weight: 600;
		margin: 0;
		padding-left: 60px;

		@media only screen and (max-width: 768px) {
			padding-left: 30px;
			font-size: 20px;
		}
	}

	.row-heading {
		display: flex;
		align-items: center;
		gap: 40px;

		a {
			display: flex;
			color: white;
			text-decoration: none;
		}
	}

	.row-posters {
		display: flex;
		gap: 15px;
		overflow-y: auto;
		overflow-x: scroll;
		padding: 20px 60px 30px;

		@media only screen and (max-width: 768px) {
			padding: 20px 30px 25px;
		}
	}

	.row-posters::-webkit-scrollbar {
		display: none;
	}
`;

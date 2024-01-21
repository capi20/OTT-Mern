import styled from "styled-components";

const StyledAccount = styled.div`
	.account {
		max-width: 500px;
		margin: auto;
		display: flex;
		flex-direction: column;
		gap: 30px;

		h2 {
			font-weight: 600;
		}

		label {
			color: #fff;
		}

		&-btn {
			background: orange;
			width: 100%;
		}
	}
`;

export default StyledAccount;

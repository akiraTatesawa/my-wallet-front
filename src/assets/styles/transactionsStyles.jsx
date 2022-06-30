import styled from "styled-components";

export const SingleTransactionContainer = styled.span`
  @import url("https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap");

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;

  &span {
    font-family: "Raleway", sans-serif;
    font-weight: 400;
  }
`;

export const TransactionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 90%;
  overflow: scroll;
`;

export const Date = styled.span`
  color: #c6c6c6;
  margin-right: 12px;
`;

export const Description = styled.span`
  color: #000000;
`;

export const Value = styled.span`
  color: ${(props) => (props.type === "expense" ? "#C70000" : "#03AC00")};
`;

export const Balance = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  font-weight: 700;
  color: #000000;
`;

export const Total = styled.span`
  font-weight: 400;
  color: ${(props) => (props.isNegative ? "#C70000" : "#03AC00")};
`;

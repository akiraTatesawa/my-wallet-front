import styled from "styled-components";

export const SingleTransactionContainer = styled.li`
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

export const TransactionsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 90%;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Date = styled.span`
  color: #c6c6c6;
  margin-right: 12px;
`;

export const Description = styled.span`
  max-width: 70%;
  color: #000000;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Value = styled.span`
  color: ${(props) => (props.type === "expense" ? "#C70000" : "#03AC00")};
  font-size: 1em;
  height: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 15px;

  & button {
    padding: 0;
    margin-left: 10px;
    height: 1em;
    background-color: #ffffff;
    border: none;
    padding: none;
  }
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

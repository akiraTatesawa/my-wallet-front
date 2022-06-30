import styled from "styled-components";
import { Container } from "./shared/sharedStyles";

export const HomeContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;

  & main {
    height: 60%;
    margin-bottom: 13px;
  }
`;

export const Footer = styled.footer`
  height: 20%;
  width: 100%;
  display: flex;
  gap: 0.5em;

  & button {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 17px;
    color: #ffffff;
    font-weight: 700;
    width: 100%;
    background-color: #a328d6;
    border-radius: 5px;
    border: none;
    padding: 9px;
  }

  & span {
    text-align: left;
  }
`;

export const UserTransactions = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) =>
    props.userHasTransactions ? "space-between" : "center"};
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 5px;
  color: #868686;
  font-size: 20px;
  font-weight: 400;
  text-align: center;
  padding: 12px;
  overflow: auto;
`;

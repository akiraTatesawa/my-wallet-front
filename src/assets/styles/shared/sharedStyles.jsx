import styled from "styled-components";

export const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Saira+Stencil+One&display=swap");

  padding: 25px;
  width: 100%;
  height: 100vh;

  & h1 {
    font-family: "Saira Stencil One", cursive;
  }

  & input,
  button,
  p,
  header,
  main {
    font-family: "Raleway", sans-serif;
  }
`;

export const Main = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-size: 15px;
    font-weight: 700;
    color: #ffffff;
    text-align: center;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 420px;
`;

export const Title = styled.h1`
  font-weight: 400;
  font-size: 32px;
  color: #ffffff;
  margin-bottom: 30px;
`;

export const Input = styled.input`
  height: 58px;
  background-color: #ffffff;
  border-radius: 5px;
  outline: none;
  border: none;
  margin-bottom: 13px;
  padding: 0 15px;
  font-size: 20px;

  &::placeholder {
    color: #000000;
    font-size: 20px;
    vertical-align: middle;
  }

  &:focus::placeholder {
    opacity: 0.5;
  }

  &:focus {
    outline: 2px solid #fbd3fc;
  }
`;

export const SubmitButton = styled.button`
  height: 58px;
  background-color: #a328d6;
  border-radius: 5px;
  outline: none;
  border: none;
  font-size: 20px;
  color: #ffffff;
  font-weight: 700;
  vertical-align: middle;
  text-align: center;
  margin-bottom: 36px;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 26px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 40px;
`;
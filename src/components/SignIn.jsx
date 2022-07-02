import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";

import {
  Main,
  Form,
  Input,
  SubmitButton,
  Title,
  Container,
  Warning,
} from "../assets/styles/shared/sharedStyles";

import UserContext from "../contexts/UserContext";

function SignIn() {
  const URL = "http://localhost:5000/sign-in";
  const [isLoading, setIsLoading] = useState(false);
  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: "",
  });
  const { setUserData } = useContext(UserContext);
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const [loginErrorWarning, setLoginErrorWarning] = useState("");

  const navigate = useNavigate();

  const submitButtonContent = isLoading ? (
    <ThreeDots color="#FFFFFF" />
  ) : (
    "Entrar"
  );

  const wrongLoginWarning = isLoginFailed && (
    <Warning>{loginErrorWarning}</Warning>
  );

  function handleSuccess(res) {
    localStorage.setItem("userData", JSON.stringify(res.data));
    setUserData(res.data);

    setIsLoading(false);
    navigate("/dashboard");
  }

  function handleError(err) {
    const { status } = err.response;

    setIsLoginFailed(true);
    setUserLoginData({ ...userLoginData, email: "", password: "" });

    if (status === 401) {
      setLoginErrorWarning("Usuário ou senha incorretos!");
    }
    if (status === 404) {
      setLoginErrorWarning("Usuário inexistente!");
    }

    setIsLoading(false);
  }

  function handleChange(e) {
    setIsLoginFailed(false);
    setLoginErrorWarning("");

    const { name } = e.target;
    const { value } = e.target;

    setUserLoginData({ ...userLoginData, [name]: value });
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const promise = axios.post(URL, userLoginData);

    promise.then(handleSuccess).catch(handleError);
  }

  return (
    <Container>
      <Main>
        <Title>MyWallet</Title>
        <Form onSubmit={(e) => handleLoginSubmit(e)}>
          <Input
            type="email"
            name="email"
            placeholder="E-mail"
            value={userLoginData.email}
            required
            title="Email"
            disabled={isLoading}
            onChange={(e) => handleChange(e)}
          />
          <Input
            type="password"
            name="password"
            placeholder="Senha"
            value={userLoginData.password}
            required
            title="Senha"
            disabled={isLoading}
            onChange={(e) => handleChange(e)}
          />

          {wrongLoginWarning}

          <SubmitButton type="submit" title="Entrar" disabled={isLoading}>
            {submitButtonContent}
          </SubmitButton>
          <Link to="/sign-up" title="Cadastre-se">
            <p>Primeira vez? Cadastre-se!</p>
          </Link>
        </Form>
      </Main>
    </Container>
  );
}

export default SignIn;

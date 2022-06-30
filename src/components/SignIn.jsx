import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

import {
  Main,
  Form,
  Input,
  SubmitButton,
  Title,
  Container,
  Warning,
} from "../assets/styles/shared/sharedStyles";

function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const submitButtonContent = isLoading ? (
    <ThreeDots color="#FFFFFF" />
  ) : (
    "Entrar"
  );

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    console.log(userLoginData);
    setUserLoginData({ ...userLoginData, email: "", password: "" });
    setIsLoading(false);
    navigate("/dashboard");
  }

  return (
    <Container>
      <Main>
        <Title>MyWallet</Title>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Input
            type="email"
            name="email"
            placeholder="E-mail"
            value={userLoginData.email}
            required
            title="Email"
            disabled={isLoading}
            onChange={(e) =>
              setUserLoginData({ ...userLoginData, email: e.target.value })
            }
          />
          <Input
            type="password"
            name="password"
            placeholder="Senha"
            value={userLoginData.password}
            required
            title="Senha"
            disabled={isLoading}
            onChange={(e) =>
              setUserLoginData({ ...userLoginData, password: e.target.value })
            }
          />

          <Warning>Usuário ou senha incorretos!</Warning>

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

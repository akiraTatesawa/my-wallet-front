import React, { useState } from "react";
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

function SignUp() {
  const { REACT_APP_SERVER_URL } = process.env;
  const [isLoading, setIsLoading] = useState(false);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);

  const navigate = useNavigate();

  const [userRegistrationData, setUserRegistrationData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const submitButtonContent = isLoading ? (
    <ThreeDots color="#FFFFFF" />
  ) : (
    "Entrar"
  );

  const passwordsDontMatchTextWarning = userRegistrationData.password !==
    passwordConfirmation && <Warning>As senhas devem ser iguais!</Warning>;

  const userAlreadyRegisteredWarning = isAlreadyRegistered && (
    <Warning>Este email já está cadastrado!</Warning>
  );

  function handleChange(e) {
    setIsAlreadyRegistered(false);
    const { name } = e.target;
    const { value } = e.target;

    if (name === "passwordConfirmation") {
      setPasswordConfirmation(value);
      return;
    }

    setUserRegistrationData({ ...userRegistrationData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const promise = axios.post(
      `${REACT_APP_SERVER_URL}/sign-up`,
      userRegistrationData
    );

    promise
      .then(() => {
        console.log("Cadastrado!");
        navigate("/");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setUserRegistrationData({
          ...userRegistrationData,
          name: "",
          email: "",
          password: "",
        });
        setPasswordConfirmation("");
        setIsLoading(false);
        setIsAlreadyRegistered(true);
      });
  }

  return (
    <Container>
      <Main>
        <Title>MyWallet</Title>

        <Form onSubmit={(e) => handleSubmit(e)}>
          <Input
            type="text"
            name="name"
            placeholder="Nome"
            required
            title="Nome"
            value={userRegistrationData.name}
            disabled={isLoading}
            onChange={(e) => handleChange(e)}
          />
          <Input
            type="email"
            name="email"
            placeholder="E-mail"
            required
            title="Email"
            value={userRegistrationData.email}
            disabled={isLoading}
            onChange={(e) => handleChange(e)}
          />
          <Input
            type="password"
            name="password"
            placeholder="Senha"
            required
            title="Senha"
            value={userRegistrationData.password}
            disabled={isLoading}
            onChange={(e) => handleChange(e)}
          />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirme a senha"
            required
            title="Confirme a senha"
            value={passwordConfirmation}
            disabled={isLoading}
            onChange={(e) => handleChange(e)}
          />

          {userAlreadyRegisteredWarning}
          {passwordsDontMatchTextWarning}

          <SubmitButton
            type="submit"
            title="Entrar"
            disabled={
              isLoading ||
              userRegistrationData.password !== passwordConfirmation
            }
          >
            {submitButtonContent}
          </SubmitButton>

          <Link to="/" title="Cadastre-se">
            <p>Já tem uma conta? Entre agora!</p>
          </Link>
        </Form>
      </Main>
    </Container>
  );
}

export default SignUp;

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
  const [errorMessage, setErrorMessage] = useState("");
  const [userRegistrationData, setUserRegistrationData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const navigate = useNavigate();

  const submitButtonContent = isLoading ? (
    <ThreeDots color="#FFFFFF" />
  ) : (
    "Cadastrar"
  );

  const passwordsDontMatchTextWarning = userRegistrationData.password !==
    passwordConfirmation && <Warning>As senhas devem ser iguais!</Warning>;

  const errorWarning = errorMessage.length > 0 && (
    <Warning>{errorMessage}</Warning>
  );

  function handleError(err) {
    const { status, statusText } = err.response;
    console.log(statusText);

    if (status === 422) {
      setErrorMessage("Preencha os campos corretamente!");
    }

    if (status === 409) {
      setErrorMessage("Já existe um usuário com este email!");
    }

    setUserRegistrationData({
      ...userRegistrationData,
      name: "",
      email: "",
      password: "",
    });
    setPasswordConfirmation("");
    setIsLoading(false);
  }

  function handleChange(e) {
    setErrorMessage("");
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
      .catch(handleError);
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
            maxLength={15}
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

          {errorWarning}
          {passwordsDontMatchTextWarning}

          <SubmitButton
            type="submit"
            title="Cadastrar"
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

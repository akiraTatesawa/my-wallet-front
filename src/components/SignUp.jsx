import React, { useState } from "react";
import { Link } from "react-router-dom";
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

function SignUp() {
  const [isLoading, setIsLoading] = useState(false);

  const [userRegistrationData, setUserRegistrationData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const submitButtonContent = isLoading ? (
    <ThreeDots color="#FFFFFF" />
  ) : (
    "Entrar"
  );

  const passwordsDontMatchText = userRegistrationData.password !==
    userRegistrationData.passwordConfirmation && (
    <Warning>As senhas devem ser iguais!</Warning>
  );

  function handleChange(e) {
    const { name } = e.target;
    const { value } = e.target;
    setUserRegistrationData({ ...userRegistrationData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    if (
      userRegistrationData.password !==
      userRegistrationData.passwordConfirmation
    ) {
      console.log("As duas senhas devem ser idênticas!");
      setUserRegistrationData({
        ...userRegistrationData,
        password: "",
        passwordConfirmation: "",
      });
    }
    setIsLoading(false);
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
            value={userRegistrationData.passwordConfirmation}
            disabled={isLoading}
            onChange={(e) => handleChange(e)}
          />

          {passwordsDontMatchText}

          <SubmitButton
            type="submit"
            title="Entrar"
            disabled={
              isLoading ||
              userRegistrationData.password !==
                userRegistrationData.passwordConfirmation
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

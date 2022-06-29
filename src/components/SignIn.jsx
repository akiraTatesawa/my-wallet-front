import React from "react";
import { Link } from "react-router-dom";

import {
  Main,
  Form,
  Input,
  SubmitButton,
  Title,
  Container,
} from "../assets/styles/shared/sharedStyles";

function SignIn() {
  return (
    <Container>
      <Main>
        <Title>MyWallet</Title>
        <Form>
          <Input
            type="email"
            name="email"
            placeholder="E-mail"
            required
            title="Email"
          />
          <Input
            type="password"
            name="password"
            placeholder="Senha"
            required
            title="Senha"
          />
          <SubmitButton type="submit" title="Entrar">
            Entrar
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

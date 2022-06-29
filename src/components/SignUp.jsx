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

function SignUp() {
  return (
    <Container>
      <Main>
        <Title>MyWallet</Title>
        <Form>
          <Input
            type="text"
            name="name"
            placeholder="Nome"
            required
            title="Nome"
          />
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
          <Input
            type="password"
            name="password"
            placeholder="Confirme a senha"
            required
            title="Confirme a senha"
          />
          <SubmitButton type="submit" title="Entrar">
            Cadastrar
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

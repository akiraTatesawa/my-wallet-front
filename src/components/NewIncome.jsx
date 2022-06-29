import React from "react";

import {
  Container,
  Form,
  Header,
  Input,
  SubmitButton,
} from "../assets/styles/shared/sharedStyles";

function NewIncome() {
  return (
    <Container>
      <Header>Nova entrada</Header>
      <main>
        <Form>
          <Input
            type="text"
            name="value"
            placeholder="Valor"
            required
            title="Valor"
          />
          <Input
            type="text"
            name="Description"
            placeholder="Descrição"
            required
            title="Descrição"
          />
          <SubmitButton type="submit" title="Salvar entrada">
            Salvar entrada
          </SubmitButton>
        </Form>
      </main>
    </Container>
  );
}

export default NewIncome;

import React from "react";

import {
  Container,
  Form,
  Header,
  Input,
  SubmitButton,
} from "../assets/styles/shared/sharedStyles";

function NewExpense() {
  return (
    <Container>
      <Header>Nova saída</Header>
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
          <SubmitButton type="submit" title="Salvar saída">
            Salvar saída
          </SubmitButton>
        </Form>
      </main>
    </Container>
  );
}

export default NewExpense;

import React, { useState } from "react";

import {
  Container,
  Form,
  Header,
  Input,
  SubmitButton,
  Warning,
} from "../assets/styles/shared/sharedStyles";

import { realMask } from "../auxiliary-functions/realMask";

function NewExpense() {
  const [isLoading, setIsLoading] = useState(false);
  const [newExpenseData, setNewExpenseData] = useState({
    description: "",
    type: "expense",
    value: "",
  });

  function handleChange(e) {
    let { value } = e.target;
    const { name } = e.target;
    if (name === "value") {
      value = realMask(value);
    }
    setNewExpenseData({ ...newExpenseData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    console.log(newExpenseData);
    setIsLoading(false);
  }

  return (
    <Container>
      <Header>Nova saída</Header>
      <main>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Input
            type="text"
            name="value"
            value={newExpenseData.value}
            placeholder="Valor"
            maxLength={10}
            required
            title="Valor"
            disabled={isLoading}
            onChange={(e) => handleChange(e)}
            onKeyUp={(e) =>
              e.target.value === "0,00" &&
              setNewExpenseData({ ...newExpenseData, value: "" })
            }
          />

          <Input
            type="text"
            name="description"
            placeholder="Descrição"
            maxLength={20}
            required
            title="Descrição"
            disabled={isLoading}
            onChange={(e) => handleChange(e)}
          />

          <Warning>Preencha os campos corretamente!</Warning>

          <SubmitButton type="submit" title="Salvar saída" disable={isLoading}>
            Salvar saída
          </SubmitButton>
        </Form>
      </main>
    </Container>
  );
}

export default NewExpense;

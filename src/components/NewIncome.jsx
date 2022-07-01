import React, { useState } from "react";

import { ThreeDots } from "react-loader-spinner";

import {
  Container,
  Form,
  Header,
  Input,
  SubmitButton,
  Warning,
} from "../assets/styles/shared/sharedStyles";

import { realMask } from "../auxiliary-functions/realMask";

function NewIncome() {
  const [isLoading, setIsLoading] = useState(false);
  const [newIncomeData, setNewIncomeData] = useState({
    description: "",
    type: "income",
    value: "",
  });

  const submitButtonContent = isLoading ? (
    <ThreeDots color="#FFFFFF" />
  ) : (
    "Entrar"
  );

  function handleChange(e) {
    let { value } = e.target;
    const { name } = e.target;
    if (name === "value") {
      value = realMask(value);
    }
    setNewIncomeData({ ...newIncomeData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    console.log(newIncomeData);
    setIsLoading(false);
  }

  return (
    <Container>
      <Header>Nova entrada</Header>
      <main>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Input
            type="text"
            name="value"
            value={newIncomeData.value}
            placeholder="Valor"
            maxLength={9}
            required
            title="Valor"
            disabled={isLoading}
            onChange={(e) => handleChange(e)}
            onKeyUp={(e) =>
              e.target.value === "0,00" &&
              setNewIncomeData({ ...newIncomeData, value: "" })
            }
          />

          <Input
            type="text"
            name="description"
            value={newIncomeData.description}
            placeholder="Descrição"
            maxLength={20}
            required
            title="Descrição"
            disabled={isLoading}
            onChange={(e) => handleChange(e)}
          />

          <Warning>Preencha os campos corretamente!</Warning>

          <SubmitButton
            type="submit"
            title="Salvar entrada"
            disabled={isLoading}
          >
            {submitButtonContent}
          </SubmitButton>
        </Form>
      </main>
    </Container>
  );
}

export default NewIncome;

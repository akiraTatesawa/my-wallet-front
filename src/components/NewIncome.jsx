import axios from "axios";
import React, { useContext, useState } from "react";

import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Form,
  Header,
  Input,
  SubmitButton,
  Warning,
} from "../assets/styles/shared/sharedStyles";

import { realMask } from "../auxiliary-functions/realMask";
import UserContext from "../contexts/UserContext";

function NewIncome() {
  const { REACT_APP_SERVER_URL } = process.env;
  const { userData } = useContext(UserContext);

  const [isInvalidInput, setIsInvalidInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newIncomeData, setNewIncomeData] = useState({
    description: "",
    type: "income",
    value: "",
  });

  const navigate = useNavigate();

  const submitButtonContent = isLoading ? (
    <ThreeDots color="#FFFFFF" />
  ) : (
    "Entrar"
  );

  const warningContent = isInvalidInput && (
    <Warning>Preencha os campos corretamente!</Warning>
  );

  function handleChange(e) {
    setIsInvalidInput(false);

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

    const { token } = userData;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.post(
      `${REACT_APP_SERVER_URL}/transactions`,
      newIncomeData,
      config
    );

    promise
      .then(() => {
        navigate("/dashboard");
        setIsLoading(false);
      })
      .catch((err) => {
        setNewIncomeData({ ...newIncomeData, description: "", value: "" });
        setIsInvalidInput(true);
        setIsLoading(false);
        console.log(err.response);
      });
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

          {warningContent}

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

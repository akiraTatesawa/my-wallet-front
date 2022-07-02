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

function NewExpense() {
  const { REACT_APP_SERVER_URL } = process.env;
  const { userData } = useContext(UserContext);

  const [isInvalidInput, setIsInvalidInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newExpenseData, setNewExpenseData] = useState({
    description: "",
    type: "expense",
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

  function handleError(err) {
    const { status, statusText } = err.response;
    console.log(statusText);

    if (status === 401) {
      localStorage.removeItem("userData");
      navigate("/");
    }

    setNewExpenseData({ ...newExpenseData, description: "", value: "" });
    setIsInvalidInput(true);
    setIsLoading(false);
  }

  function handleChange(e) {
    setIsInvalidInput(false);
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

    const { token } = userData;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.post(
      `${REACT_APP_SERVER_URL}/transactions`,
      newExpenseData,
      config
    );

    promise
      .then(() => {
        navigate("/dashboard");
        setIsLoading(false);
      })
      .catch(handleError);
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
            value={newExpenseData.description}
            placeholder="Descrição"
            maxLength={20}
            required
            title="Descrição"
            disabled={isLoading}
            onChange={(e) => handleChange(e)}
          />

          {warningContent}

          <SubmitButton type="submit" title="Salvar saída" disabled={isLoading}>
            {submitButtonContent}
          </SubmitButton>
        </Form>
      </main>
    </Container>
  );
}

export default NewExpense;

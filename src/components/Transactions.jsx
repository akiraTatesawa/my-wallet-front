import axios from "axios";
import React, { useContext, useEffect, useMemo, useState } from "react";

import { IconContext } from "react-icons";
import { BsX } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import {
  Balance,
  Date,
  Description,
  SingleTransactionContainer,
  Total,
  TransactionsContainer,
  Value,
} from "../assets/styles/transactionsStyles";

import UserContext from "../contexts/UserContext";

function Transaction({
  description,
  type,
  value,
  date,
  id,
  renderTransactions,
}) {
  const { userData } = useContext(UserContext);
  const deleteIconValues = useMemo(
    () => ({ color: "#C6C6C6", size: "1em" }),
    []
  );

  const navigate = useNavigate();

  function deleteTransaction() {
    if (window.confirm("Deseja deletar este registro?")) {
      const { REACT_APP_SERVER_URL } = process.env;
      const { token } = userData;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const promise = axios.delete(
        `${REACT_APP_SERVER_URL}/transactions/${id}`,
        config
      );

      promise
        .then(() => {
          renderTransactions();
        })
        .catch(() => {
          alert("Houve um erro no processo.\nFaça login novamente.");
          localStorage.removeItem("userData");
          navigate("/");
        });
    }
  }

  return (
    <SingleTransactionContainer>
      <Description>
        <Date>{date}</Date>
        {description}
      </Description>
      <Value type={type}>
        {value}
        <button
          type="button"
          title="Deletar registro"
          onClick={() => deleteTransaction()}
        >
          <IconContext.Provider value={deleteIconValues}>
            <BsX />
          </IconContext.Provider>
        </button>
      </Value>
    </SingleTransactionContainer>
  );
}

export function Transactions({ transactionsList, renderTransactions }) {
  const [balance, setBalance] = useState({ value: "", isNegative: false });

  function renderTransactionsList() {
    return transactionsList.map(({ id, description, type, value, date }) => (
      <Transaction
        id={id}
        key={id}
        description={description}
        type={type}
        value={value}
        date={date}
        renderTransactions={renderTransactions}
      />
    ));
  }

  function calcBalance() {
    let auxBalance = 0;

    transactionsList.map(({ value, type }) => {
      let valueNum = parseFloat(value.replace(",", "."));

      if (type === "expense") {
        valueNum *= -1;
      }

      auxBalance += valueNum;

      return valueNum;
    });

    const isNegative = auxBalance < 0;

    setBalance({
      ...balance,
      value: auxBalance.toFixed(2).replace(".", ",").replace("-", ""),
      isNegative,
    });
  }

  const transactionsContainerContent = renderTransactionsList();

  useEffect(() => {
    calcBalance();
  }, []);

  return (
    <>
      <TransactionsContainer>
        {transactionsContainerContent}
      </TransactionsContainer>
      <Balance>
        <span>SALDO</span>
        <Total isNegative={balance.isNegative}>{balance.value}</Total>
      </Balance>
    </>
  );
}

import React, { useEffect, useState } from "react";
import {
  Balance,
  Date,
  Description,
  SingleTransactionContainer,
  Total,
  TransactionsContainer,
  Value,
} from "../assets/styles/transactionsStyles";

function Transaction({ description, type, value, date }) {
  return (
    <SingleTransactionContainer>
      <Description>
        <Date>{date}</Date>
        {description}
      </Description>
      <Value type={type}>{value}</Value>
    </SingleTransactionContainer>
  );
}

export function Transactions({ transactionsList }) {
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

import React from "react";
import {
  Balance,
  Date,
  Description,
  SingleTransactionContainer,
  Total,
  TransactionsContainer,
  Value,
} from "../assets/styles/transactionsStyles";

function Transaction() {
  return (
    <SingleTransactionContainer>
      <Description>
        <Date>30/11</Date>Almoço com a mãe
      </Description>
      <Value type="expense">39,90</Value>
    </SingleTransactionContainer>
  );
}

export function Transactions() {
  return (
    <>
      <TransactionsContainer>
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
      </TransactionsContainer>
      <Balance>
        <span>SALDO</span>
        <Total>28495,00</Total>
      </Balance>
    </>
  );
}

import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IconContext } from "react-icons";
import { MdLogout } from "react-icons/md";
import { BsPlusCircle, BsDashCircle } from "react-icons/bs";

import axios from "axios";
import {
  Footer,
  HomeContainer,
  UserTransactions,
} from "../assets/styles/homeStyles";
import { Header } from "../assets/styles/shared/sharedStyles";

import { Transactions } from "./Transactions";

import UserContext from "../contexts/UserContext";

function Home() {
  const { REACT_APP_SERVER_URL } = process.env;
  const { userData } = useContext(UserContext);
  const [transactions, setTransactions] = useState(null);

  const navigate = useNavigate();

  function getUserTransactions() {
    const { token } = userData;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.get(`${REACT_APP_SERVER_URL}/transactions`, config);

    promise
      .then((res) => {
        setTransactions([...res.data.reverse()]);
      })
      .catch((err) => {
        console.log(err.response.statusText);
        localStorage.removeItem("userData");
        navigate("/");
      });
  }

  useEffect(() => getUserTransactions(), []);

  function renderTransactions() {
    if (!transactions?.length) {
      return "Não há registros de entrada ou saída";
    }
    return (
      <Transactions
        transactionsList={transactions}
        renderTransactions={() => getUserTransactions()}
      />
    );
  }

  function handleSignOut() {
    if (window.confirm("Deseja mesmo sair?")) {
      const { token } = userData;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const promise = axios.delete(`${REACT_APP_SERVER_URL}/sign-out`, config);

      promise
        .then(() => {
          localStorage.removeItem("userData");
          navigate("/");
        })
        .catch((err) => {
          localStorage.removeItem("userData");
          console.log(err.response.statusText);
          navigate("/");
        });
    }
  }

  const signOutIconValues = useMemo(
    () => ({ color: "#ffffff", size: "1em" }),
    []
  );

  const addNewTransactionIconValues = useMemo(
    () => ({ color: "#ffffff", size: "1.2em" }),
    []
  );

  const userTransactionsContent = renderTransactions();

  return (
    <HomeContainer>
      <Header page="home">
        Olá, {userData.name}
        <button type="button" title="Sair" onClick={() => handleSignOut()}>
          <IconContext.Provider value={signOutIconValues}>
            <MdLogout />
          </IconContext.Provider>
        </button>
      </Header>

      <main>
        <UserTransactions userHasTransactions={Boolean(transactions?.length)}>
          {userTransactionsContent}
        </UserTransactions>
      </main>

      <Footer>
        <button
          type="button"
          title="Nova entrada"
          onClick={() => navigate("/new-income")}
        >
          <IconContext.Provider value={addNewTransactionIconValues}>
            <BsPlusCircle />
          </IconContext.Provider>
          <span>
            Nova <br /> entrada
          </span>
        </button>
        <button
          type="button"
          title="Nova saída"
          onClick={() => navigate("/new-expense")}
        >
          <IconContext.Provider value={addNewTransactionIconValues}>
            <BsDashCircle />
          </IconContext.Provider>
          <span>
            Nova <br /> saída
          </span>
        </button>
      </Footer>
    </HomeContainer>
  );
}

export default Home;

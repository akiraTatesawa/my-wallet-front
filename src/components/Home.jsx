import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
  const URL = "http://localhost:5000/transactions";
  const { userData } = useContext(UserContext);
  const [transactions, setTransactions] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const { token } = userData;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.get(URL, config);

    promise
      .then((res) => {
        setTransactions([...res.data.reverse()]);
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
  }, []);

  function renderTransactions() {
    if (!transactions?.length) {
      return "Não há registros de entrada ou saída";
    }
    return <Transactions transactionsList={transactions} />;
  }

  const logoutIconValues = useMemo(
    () => ({ color: "#ffffff", size: "1.2em" }),
    []
  );

  const addNewTransactionIconValues = useMemo(
    () => ({ color: "#ffffff", size: "1.2em" }),
    []
  );

  const userTransactionsContent = renderTransactions();

  return (
    <HomeContainer>
      <Header>
        Olá, {userData.name}
        <Link to="/" title="Logout">
          <IconContext.Provider value={logoutIconValues}>
            <MdLogout />
          </IconContext.Provider>
        </Link>
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

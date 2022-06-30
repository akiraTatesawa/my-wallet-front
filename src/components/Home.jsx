import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { IconContext } from "react-icons";
import { MdLogout } from "react-icons/md";
import { BsPlusCircle, BsDashCircle } from "react-icons/bs";

import {
  Footer,
  HomeContainer,
  UserTransactions,
} from "../assets/styles/homeStyles";
import { Header } from "../assets/styles/shared/sharedStyles";
import { Transactions } from "./Transactions";

function Home() {
  const [transactions, setTransactions] = useState([1]);

  useEffect(() => {
    setTransactions([...transactions]);
  }, []);

  const navigate = useNavigate();

  const logoutIconValues = useMemo(
    () => ({ color: "#ffffff", size: "1.2em" }),
    []
  );

  const addNewTransactionIconValues = useMemo(
    () => ({ color: "#ffffff", size: "1.2em" }),
    []
  );

  return (
    <HomeContainer>
      <Header>
        Olá, Fulano
        <Link to="/" title="Logout">
          <IconContext.Provider value={logoutIconValues}>
            <MdLogout />
          </IconContext.Provider>
        </Link>
      </Header>

      <main>
        <UserTransactions userHasTransactions={Boolean(transactions.length)}>
          <Transactions />
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

import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import "./assets/GlobalStyles/reset.css";
import GlobalStyle from "./assets/GlobalStyles/GlobalStyles";

import Home from "./components/Home";
import NewExpense from "./components/NewExpense";
import NewIncome from "./components/NewIncome";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import UserContext from "./contexts/UserContext";

function App() {
  function searchUserDataLocalStorage() {
    const userDataLocal = JSON.parse(localStorage.getItem("userData"));
    if (userDataLocal) {
      return userDataLocal;
    }
    return { name: "", token: "", userId: "" };
  }

  const navigate = useNavigate();
  const location = useLocation();

  const [userData, setUserData] = useState(searchUserDataLocalStorage);

  useEffect(() => {
    if (userData.token.length !== 0 && location.pathname === "/") {
      navigate("/dashboard");
    }
    if (userData.token.length === 0 && location.pathname !== "/sign-up") {
      navigate("/");
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
      <UserContext.Provider value={{ userData, setUserData }}>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/new-income" element={<NewIncome />} />
          <Route path="/new-expense" element={<NewExpense />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;

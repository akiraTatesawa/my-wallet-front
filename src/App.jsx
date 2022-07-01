import React, { useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

  const [userData, setUserData] = useState(searchUserDataLocalStorage);
  const userContextValue = useMemo(() => ({ userData, setUserData }));

  return (
    <BrowserRouter>
      <GlobalStyle />
      <UserContext.Provider value={userContextValue}>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/new-income" element={<NewIncome />} />
          <Route path="/new-expense" element={<NewExpense />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;

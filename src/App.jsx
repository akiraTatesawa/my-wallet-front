import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyle from "./assets/GlobalStyles/GlobalStyles";
import Home from "./components/Home";
import NewExpense from "./components/NewExpense";
import NewIncome from "./components/NewIncome";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/new-income" element={<NewIncome />} />
        <Route path="/new-expense" element={<NewExpense />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Cart from "./pages/Cart/Cart";
import FullPizza from "./pages/FullPizza/FullPizza";

import './App.scss';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="pizza/:id" element={<FullPizza />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

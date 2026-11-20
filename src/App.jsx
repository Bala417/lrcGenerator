import { useEffect, useRef, useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import { themeChange } from "theme-change";
import Header from "./component/Header";
import Home from "./page/Home";
import { BrowserRouter, Routes, Route } from "react-router";
function App() {
  const detailsRef = useRef(null);

  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <BrowserRouter basename="/lrcGenerator/">
      <Routes>
        <Route element={<Header />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

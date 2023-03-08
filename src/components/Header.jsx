//UTILIZAR EL ATAJO rafce para generar la estructura del componente
import React, { useState, useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const Header = () => {
  const [darkmode, setDarkMode] = useState(false);
  const color = useContext(ThemeContext);
  const handleClick = () => {
    setDarkMode(!darkmode);
  };

  return (
    <div
      className="card header"
      style={
        darkmode
          ? { backgroundColor: "black", color: "white" }
          : { backgroundColor: "white" }
      }
    >
      <h1 style={{ color }}>React Hooks</h1>
      <button onClick={handleClick} type="button">
        {darkmode ? "dark mode" : "light Mode"}
      </button>
    </div>
  );
};

export default Header;

import classes from "./Header.module.css";
import React from "react";
import mealImg from "./../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>Canteenol</h1>
        <HeaderCartButton />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealImg} alt="banner" />
      </div>
    </React.Fragment>
  );
};

export default Header;

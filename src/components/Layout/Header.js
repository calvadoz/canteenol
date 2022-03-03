import classes from "./Header.module.css";
import React, { useContext } from "react";
import mealImg from "./../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";
import { CartContext } from "./../store/cart-context";

const Header = (props) => {
  const cartCtx = useContext(CartContext);
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>Canteenol</h1>
        <HeaderCartButton onShowCart={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealImg} alt="banner" />
      </div>
    </React.Fragment>
  );
};

export default Header;

import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import { CartContext } from "./../store/cart-context";
import CartItem from "../UI/CartItem";
import Input from "../UI/Input";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const [couponCode, setCouponCode] = useState("");

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const applyCodeHandler = (e) => {
    setCouponCode(e.target.value);
  };

  return (
    <Modal onBackdropClick={props.onCloseCart}>
      <ul className={classes["cart-items"]}>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            summary="test"
            price={item.price}
            amount={item.amount}
            onRemove={() => cartItemRemoveHandler(item.id)}
            onAdd={() => cartItemAddHandler(item)}
          />
        ))}
      </ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.total}>
        <span>Code</span>
        <Input
          onChange={(e) => applyCodeHandler(e)}
          style={{ width: 250 }}
          label=""
          input={{
            placeholder: "Enter Code",
            id: "code",
            type: "text",
            value: couponCode,
          }}
        />
      </div>
      <div className={classes.actions}>
        <button className={`${classes["apply-code"]} ${classes.disabled}`}>
          Apply Code
        </button>
        <button onClick={props.onCloseCart} className={classes["button--alt"]}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;

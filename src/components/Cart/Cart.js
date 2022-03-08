import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import { CartContext } from "./../store/cart-context";
import CartItem from "../UI/CartItem";
import Input from "../UI/Input";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const [isCheckingOut, setIsCheckingOut] = useState(false);
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

  const orderHandler = () => {
    setIsCheckingOut(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    // replace with firebase URL
    await fetch("", {
      method: "POST",
      body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
      header: "application/json",
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCartItem();
  };

  const modalActions = (
    <div className={classes.actions}>
      {/* <button className={`${classes["apply-code"]} ${classes.disabled}`}>
Apply Code
</button> */}
      <button onClick={props.onCloseCart} className={classes["button--alt"]}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
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
      {isCheckingOut && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onCloseCart} />
      )}
      {!isCheckingOut && modalActions}
      {/* <div className={classes.total}>
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
      </div> */}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = <p>Successfully sent the order !</p>;

  return (
    <Modal onBackdropClick={props.onCloseCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;

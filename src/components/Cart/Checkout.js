import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });

  const nameRef = useRef();
  const streetRef = useRef();
  const postCodeRef = useRef();
  const cityRef = useRef();
  const confirmHandler = (e) => {
    e.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredStreet = streetRef.current.value;
    const enteredPost = postCodeRef.current.value;
    const enteredCity = cityRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostIsValid = isFiveChars(enteredPost);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      post: enteredPostIsValid,
    });

    const isFormValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostIsValid;

    if (!isFormValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      post: enteredPost,
    });
    // Submit Data
  };
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          formInputValidity.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">Name</label>
        <input type="text" id="name" ref={nameRef} />
        {!formInputValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.street ? "" : classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetRef} />
        {!formInputValidity.street && <p>Please enter a valid street</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.post ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">Postal Code</label>
        <input type="text" id="postal" ref={postCodeRef} />
        {!formInputValidity.post && (
          <p>Please enter exactly 5 digits zip code</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.city ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!formInputValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;

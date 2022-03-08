import React, { useState, useEffect, useCallback } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const result = await fetch(""); // replace with firebase URL

      if (!result.ok) throw new Error("Something went wrong!");

      const data = await result.json();
      const loadedMeals = [];
      for (let meal in data) {
        loadedMeals.push({ id: meal, ...data[meal] });
      }
      setMeals(loadedMeals);
    };
    setIsLoading(false);

    try {
      fetchMeals().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
    } catch (error) {}
  }, []);

  if (isLoading)
    return (
      <section className={classes["meals-loading"]}>
        <p>Loading...</p>
      </section>
    );

  if (httpError) {
    return (
      <section className={classes["meals-loading"]}>
        <p>{httpError}</p>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {meals.map((meal) => (
            <MealItem key={meal.id} meal={meal} />
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;

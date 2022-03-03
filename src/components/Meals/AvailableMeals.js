import React from "react";
import classes from "./AvailableMeals.module.css";
import { DUMMY_MEALS as mealList } from "./../../dummy-meals";
import Card from "../UI/Card";
import MealItem from "./MealItem";

const AvailableMeals = () => {
  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {mealList.map((meal) => (
            <MealItem key={meal.id} meal={meal} />
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;

import React from "react";
import MealsSummary from "./MealSummary";
import AvailableMeals from "./AvailableMeals";

const Meals = () => {
  return (
    <React.Fragment>
      <MealsSummary />
      <AvailableMeals />
    </React.Fragment>
  );
};

export default Meals;

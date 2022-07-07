import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import "../styles/food.css";
import { MenuItem, Select, FormControl, FormLabel, FormHelperText, InputLabel } from "@mui/material";
import { FoodCountry } from "./FoodCountry";


export const Food = (props) => {
  const [foodItem, setFoodItem] = useState({});
  const [ingredient, setIngredient] = useState([]);
  const [food, setFood] = useState()
  const { route, setRoute } = props;

  useEffect(() => {
    setRoute("Food");
  }, [route]);

  const getFood =  (e) => {
    e.preventDefault();
    setIngredient('')
    setFood('true')
    axios.get("/food").then((res) => {
      if (foodItem) {
        setFoodItem();
        setFoodItem(res.data.meals[0]);
      }
      for (const ingredient in res.data.meals[0]) {
        if (ingredient.includes("strIngredient"))
          setIngredient((prevalue) => {
            return [...prevalue, res.data.meals[0][ingredient]];
          });
      }
    });
  };
  const handleCategory = (e) => {
    e.preventDefault()
    console.log(e.target[0].value)
    setFood('true')
    axios.post("/food", {category: e.target[0].value})
    .then(res => {
      if (foodItem) {
        setFoodItem();
        setFoodItem(res.data.meals[0]);
      }
      for (const ingredient in res.data.meals[0]) {
        if (ingredient.includes("strIngredient"))
          setIngredient((prevalue) => {
            return [...prevalue, res.data.meals[0][ingredient]];
          });
      }
    })
  }

  console.log(foodItem);
  return (
    <div className="food">
      <br />
      <div className="button">
        <h3>Find a recipe</h3>
        <Button variant="contained" color="primary" onClick={getFood}>
          Get Recipe
        </Button>
        <br />
        <br />
        <form typeof="submit" onSubmit={handleCategory} style={{display: "flex"}}>
          <label htmlFor="food">Select by category</label>
          <select name="food" id="">
            <option value=""></option>
            <option value="Breakfast">Breakfast</option>
            <option value="Side">Side</option>
            <option value="Pasta">Pasta</option>
            <option value="Dessert">Dessert</option>
            <option value="Starter">Starter</option>
            <option value="Vegan">Vegan</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Seafood">Seafood</option>
            <option value="Miscellaneous">Miscellaneous</option>
            <option value="Beef">Beef</option>
            <option value="Chicken">Chicken</option>
            <option value="Lamb">Lamb</option>
            <option value="Pork">Pork</option>
          </select> <br />
          <Button variant="contained" color="primary" size="small" type="submit" value='submit'>
            Get Category
          </Button>
        </form>
        <h3>OR</h3>
      <FoodCountry setFoodItem={setFoodItem} setIngredient={setIngredient} foodItem={foodItem} setFood={setFood}/>
      </div>
      {food && <div className="foodCard">
      {foodItem && (
        <div className="foodcard">
          <div className="f">
          {foodItem && <img src={foodItem.strMealThumb} alt="" />}
          </div>
          <div className="f">
          {foodItem && <h1>{foodItem.strMeal}</h1>}
          </div>
          <div className="f">
          {/* {ingredient &&   <div className="ingredient">
            <h2>Ingredients:</h2>
            <FormControl>
            <InputLabel id=''>click me</InputLabel>
            <Select sx={{width: "150px"}}>
            {ingredient && (ingredient.map(el => {
        return <MenuItem>{el}</MenuItem>
      }))}
            </Select>
            </FormControl>
          </div>} */}
          </div>
        </div>
      )}
      {foodItem.strSource &&
      <h2>{foodItem.strMeal}-
      <a href={foodItem.strSource} rel="none" target="_blank">
        Recipe Link
      </a>
      </h2>}
      {foodItem.strYoutube &&
      <h2>{foodItem.strMeal}-
      <a href={foodItem.strYoutube} rel="none" target="_blank">
         Recipe Video Link
      </a>
      </h2>}
      </div>}
    </div>
  );
};

import React from 'react'
import Button from '@mui/material/Button'
import axios from 'axios'

export const FoodCountry = (props) => {
    const {setIngredient, setFoodItem, foodItem, setFood} = props

    const handleCountry = e => {
        e.preventDefault()
        console.log(e.target[0].value)
        setFood('true')
        axios.post(`/food2`, {country: e.target[0].value})
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
  return (
    <div style={{MARGIN:"25PX"}}>
        <form style={{display:'flex'}} type='submit' onSubmit={handleCountry}>
        <label htmlFor="country">select based on Country</label>
        <select name="country" id="" required>
            <option value="American">American</option>
            <option value="British">British</option>
            <option value="Canadian">Canadian</option>
            <option value="Chinese">Chinese</option>
            <option value="French">French</option>
            <option value="Greek">Greek</option>
            <option value="Indian">Indian</option>
            <option value="Italian">Italian</option>
            <option value="Japanese">Japanese</option>
            <option value="Mexican">Mexican</option>
            <option value="Russian">Russian</option>
            <option value="Spanish">Spanish</option>
            <option value="Thai">Thai</option>
            <option value="Vietnamese">Vietnamese</option>
            <option value="Unknown">Unknown</option>
        </select>
        <Button variant="contained" color="primary" type='submit'>
          Get Recipe
        </Button>
        </form>
    </div>
  )
}

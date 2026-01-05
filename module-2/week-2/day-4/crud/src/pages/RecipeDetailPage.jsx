import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RecipeDetailPage = () => {
  //grab id from url
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({});
  useEffect(() => {
    async function getOneRecipe() {
      try {
        const { data } = await axios(
          `https://dummyjson.com/recipes/${recipeId}`
        );
        console.log(data);
        setRecipe(data);
      } catch (error) {
        console.log(error);
      }
    }
    getOneRecipe();
  }, [recipeId]);

  return (
    <div>
      <h1>{recipe.name} Page</h1>
      <img alt={recipe.name} src={recipe.image} style={{ width: "90%" }} />
    </div>
  );
};
export default RecipeDetailPage;

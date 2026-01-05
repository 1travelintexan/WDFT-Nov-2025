import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import RecipeListPage from "./pages/RecipeListPage";
import AddRecipePage from "./pages/AddRecipePage";
import UpdateRecipePage from "./pages/UpdateRecipePage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import Navbar from "./components/Navbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ThemeContext } from "./contexts/ThemeContext";
function App() {
  const [recipes, setRecipes] = useState([]);
  const nav = useNavigate();

  //this is asking the context for data
  //destructure the values from the provider
  const { darkTheme, petName } = useContext(ThemeContext);
  console.log("here is values from the context", { darkTheme, petName });
  useEffect(() => {
    axios
      .get("https://dummyjson.com/recipes")
      .then(({ data }) => {
        console.log(data);
        setRecipes(data.recipes);
      })
      .catch((err) => console.log(err));
  }, []);

  async function handleAddRecipe(e, newRecipe) {
    e.preventDefault();
    try {
      // ***********axios ************
      // const { data } = await axios.post(
      //   "https://dummyjson.com/recipes/add",
      //   newRecipe
      // );
      // console.log(data);

      //************fetch ********** */
      const response = await fetch("https://dummyjson.com/recipes/add", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newRecipe),
      });
      const data = await response.json();
      console.log(data);
      setRecipes([data, ...recipes]);
      nav("/");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteRecipe(id) {
    console.log("recipe deleted", id);
    try {
      //this removes the recipe from the API or DB
      const { data } = await axios.delete(
        `https://dummyjson.com/recipes/${id}`
      );
      console.log("response to delete", data);
      //now we remove the recipe from the state
      const filteredRecipes = recipes.filter((recipe) => {
        if (recipe.id !== id) {
          return true;
        }
      });
      setRecipes(filteredRecipes);
    } catch (error) {
      console.log("error", error);
    }
  }
  return (
    <>
      <Navbar />
      <main className={darkTheme ? "dark" : null}>
        <Routes>
          <Route
            path="/"
            element={
              <RecipeListPage
                recipes={recipes}
                handleDeleteRecipe={handleDeleteRecipe}
              />
            }
          />
          <Route
            path="/add-recipe"
            element={<AddRecipePage handleAddRecipe={handleAddRecipe} />}
          />
          <Route
            path="/update-recipe/:recipeId"
            element={<UpdateRecipePage />}
          />
          <Route
            path="/recipe-detail/:recipeId"
            element={<RecipeDetailPage />}
          />
        </Routes>
      </main>
      <footer>footer</footer>
    </>
  );
}

export default App;

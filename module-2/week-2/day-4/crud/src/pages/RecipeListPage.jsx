import { Link } from "react-router-dom";

const RecipeListPage = ({ recipes, handleDeleteRecipe }) => {
  return (
    <div>
      <h1>Recipes:</h1>
      {recipes.map((oneRecipe) => {
        return (
          <div key={oneRecipe.id} className="card">
            <img alt={oneRecipe.name} src={oneRecipe.image} />
            <Link to={`/recipe-detail/${oneRecipe.id}`}>
              <h4>{oneRecipe.name}</h4>
            </Link>
            <button onClick={() => handleDeleteRecipe(oneRecipe.id)}>
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default RecipeListPage;

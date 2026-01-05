import { useState } from "react";

const AddRecipePage = ({ handleAddRecipe }) => {
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [image, setImage] = useState("");

  return (
    <div>
      <h1>Add a Recipe</h1>
      <form onSubmit={(e) => handleAddRecipe(e, { name, image, difficulty })}>
        <label>
          Recipe Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          Recipe Difficulty:
          <input
            type="text"
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value)}
          />
        </label>
        <label>
          Recipe Image:
          <input
            type="text"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
        </label>

        <button>Add Recipe</button>
      </form>
    </div>
  );
};
export default AddRecipePage;

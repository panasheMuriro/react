import { useDbData, useDbUpdate } from "@/utils/firebase";
import { Button, Text, Box } from "@chakra-ui/react";
import { useState } from "react";

import { v4 as uuid } from "uuid";

export default function AddRecipePage() {
  const user_id = "2jnasasdasdybfd2w3gr393wy4h3hr02uw";

  const [updateUser] = useDbUpdate(`my_recipe_collection/users/${user_id}/`);
  const [current_user] = useDbData(`my_recipe_collection/users/${user_id}/`);

  const recipe_id = uuid();

  const [addRecipe] = useDbUpdate("my_recipe_collection/recipes/" + recipe_id);

  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [recipe, setRecipe] = useState(null); // Store the saved recipe

  const handleAddIngredient = () => {
    setIngredients((prevIngredients) => [
      ...prevIngredients,
      "Edit", // Default value for the new ingredient
    ]);
  };

  const handleAddStep = () => {
    setSteps((prevSteps) => [...prevSteps, "Edit"]); // Default value for the new step
  };

  const removeIngredient = (index) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((_, i) => i !== index)
    );
  };

  const removeStep = (index) => {
    setSteps((prevSteps) => prevSteps.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    // Get the text content of each <li> in the ingredients and steps
    const ingredientList = Array.from(
      document.querySelectorAll("#ingredients-list li")
    ).map((li) => li.textContent.trim());

    const stepList = Array.from(
      document.querySelectorAll("#steps-list li")
    ).map((li) => li.textContent.trim());

    // Construct the recipe object using textContent of title and description
    const newRecipe = {
      recipe_id: recipe_id,
      title: (document.getElementById("title") as HTMLElement)
        .textContent as string,
      description: (document.getElementById("description") as HTMLElement)
        .textContent,
      cookin_time: (document.getElementById("description") as HTMLElement)
        .textContent,
      ingredients: ingredientList,
      steps: stepList,
      createdBy: user_id,
      createdAt: new Date().toISOString(),
    };

    setRecipe(newRecipe); // Save the recipe

    addRecipe(newRecipe); // firebase

    const current_user_recipes = current_user.recipes || [];
    current_user_recipes.push(newRecipe.recipe_id);
    current_user.recipes = current_user_recipes;

    console.log(current_user)

    updateUser({...current_user});
    console.log("Saved Recipe:", newRecipe); // Log to see the saved recipe

    // add recipe to the DB
  };

  return (
    <>
      <h1 contentEditable id="title" suppressContentEditableWarning>
        Recipe Name
      </h1>

      <p
        contentEditable
        id="description"
        suppressContentEditableWarning
        style={{ marginBottom: "20px" }}
      >
        Description
      </p>

      <Text fontSize={24}>Ingredients</Text>
      <ul id="ingredients-list">
        {ingredients.map((ingredient, index) => (
          <Box key={index} display="flex" alignItems="center">
            <li
              contentEditable
              suppressContentEditableWarning
              style={{ flex: 1 }}
            >
              {ingredient}
            </li>
            <Button
              size="xs"
              color="red"
              onClick={() => removeIngredient(index)}
            >
              Delete
            </Button>
          </Box>
        ))}
      </ul>
      <Button bgColor={"green"} size={"xs"} onClick={handleAddIngredient}>
        Add ingredient
      </Button>

      <Text fontSize={24} mt={4}>
        Steps
      </Text>
      <ul id="steps-list">
        {steps.map((step, index) => (
          <Box key={index} display="flex" alignItems="center">
            <li
              contentEditable
              suppressContentEditableWarning
              style={{ flex: 1 }}
            >
              {step}
            </li>
            <Button size="xs" color="red" onClick={() => removeStep(index)}>
              Delete
            </Button>
          </Box>
        ))}
      </ul>
      <Button size={"xs"} bgColor={"green"} onClick={handleAddStep}>
        Add step
      </Button>

      <Text fontSize={24} mt={4}>
        Cooking Time
      </Text>
      <p
        contentEditable
        id="cooking_time"
        suppressContentEditableWarning
        style={{ marginBottom: "20px" }}
      >
        30 minutes
      </p>

      <br></br>

      <Button mt={6} color="black" onClick={handleSave}>
        Save Recipe
      </Button>

      {/* Display Saved Recipe
      {recipe && (
        <Box mt={6} p={4} borderWidth={1} borderRadius="md">
          <Text fontSize={24} fontWeight="bold">
            {recipe.title}
          </Text>
          <Text>{recipe.description}</Text>

          <Text fontSize={20} mt={4}>
            Ingredients
          </Text>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>

          <Text fontSize={20} mt={4}>
            Steps
          </Text>
          <ul>
            {recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </Box>
      )} */}
    </>
  );
}

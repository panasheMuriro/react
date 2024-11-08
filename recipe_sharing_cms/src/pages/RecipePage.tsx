import { useLocation } from "react-router-dom";
import {
  Box,
  HStack,
  VStack,
  Text,
  Button,
  IconButton,
} from "@chakra-ui/react";
import RatingComponent from "@/components/custom/RatingComponent";
import Navbar from "@/components/custom/Navbar";
import { useDbData, useDbUpdate } from "@/utils/firebase";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function RecipePage() {
  const location = useLocation();
  const recipe = location.state?.recipe;
  if (!recipe) return <Text>Recipe not found.</Text>;

  const user_id = "2jnasasdasdybfd2w3gr393wy4h3hr02uw";
  const [updateRecipeLiked] = useDbUpdate(
    `my_recipe_collection/users/${user_id}`
  );
  const [userData] = useDbData(`my_recipe_collection/users/${user_id}`);

  // Check if the recipe is already in favorite_recipes
  const isFavorite = userData?.favorite_recipes?.includes(recipe.recipe_id);

  // Toggle favorite status
  const toggleFavorite = () => {
    const updatedFavorites = isFavorite
      ? userData.favorite_recipes.filter(
          (id: string) => id !== recipe.recipe_id
        )
      : [...(userData.favorite_recipes || []), recipe.recipe_id];

    updateRecipeLiked({
      favorite_recipes: updatedFavorites,
    });
  };

  return (
    <Box>
      <Navbar hasBackButton={true} />
      <Box p={8}>
        <VStack align="start" spaceY={4} w="100%">
          <Box w="100%" h="300px" bg="gray.300">
            Image
          </Box>

          <IconButton
            aria-label="Favorite recipe"
            colorScheme={isFavorite ? "red" : "gray"}
            onClick={toggleFavorite}
            variant="ghost"
            alignSelf="end"
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </IconButton>

          <Text fontSize="2xl" fontWeight="bold">
            {recipe.title}
          </Text>

          <Text fontSize="sm" color="gray.600">
            Created by: {recipe.createdBy}
          </Text>
          <Text fontSize="sm" color="gray.500">
            Date: {new Date(recipe.createdAt).toDateString()}
          </Text>
          <Text fontSize="md">{recipe.description}</Text>
          <Text fontSize="md">Cooking time: {recipe.cooking_time}</Text>

          <Text fontSize="xl" fontWeight="bold">
            Ingredients:
          </Text>
          <ul>
            {recipe.ingredients?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <Text fontSize="xl" fontWeight="bold" mt={4}>
            Steps:
          </Text>
          <ol>
            {recipe.steps?.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>

          <RatingComponent recipeId={recipe.recipe_id} />
        </VStack>
      </Box>
    </Box>
  );
}

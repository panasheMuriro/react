import {
  Box,
  VStack,
  Text,
  Avatar,
  Heading,
  AvatarIcon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import RecipeCard, { Recipe } from "@/components/custom/RecipeCard";
import { useDbData } from "@/utils/firebase";
import Navbar from "@/components/custom/Navbar";

export default function Profile() {
  const user_id = "2jnasasdasdybfd2w3gr393wy4h3hr02uw";

  // Fetch user data and recipes from the database
  const [userData] = useDbData(`my_recipe_collection/users/${user_id}`);
  let [recipes] = useDbData(`my_recipe_collection/recipes`);
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
  const [likedRecipes, setLikedRecipes] = useState<Recipe[]>([]);

  // Filter user-created and liked recipes
  useEffect(() => {
    if (recipes && userData) {
      recipes = Object.values(recipes);
      const createdRecipes = recipes.filter(
        (recipe: Recipe) => recipe.createdBy === user_id
      );

      const likedRecipeIds = userData.favorite_recipes || [];
      const likedRecipesData = recipes.filter((recipe: Recipe) =>
        likedRecipeIds.includes(recipe.recipe_id)
      );

      setUserRecipes(createdRecipes);
      setLikedRecipes(likedRecipesData);
    }
  }, [recipes, userData, user_id]);

  return (
    <Box>
      <Navbar hasBackButton={true} />

      {userData ? (
        <Box p={8}>
          {/* User Profile Header */}
          <VStack spaceY={4} mb={6}>
            {/* <Avatar size="xl" name={userData.username} src={userData.avatarUrl || undefined} /> */}
            <AvatarIcon scale={2} />
            <Heading as="h1" size="lg">
              {userData.username}
            </Heading>
            <Text fontSize="sm" color="gray.500">
              {userData.email}
            </Text>
          </VStack>

          {/* User's Recipes Section */}
          <Box mt={8}>
            <Heading as="h2" size="md" mb={4}>
              Your Recipes
            </Heading>
            <VStack spacing={4} align="center">
              {userRecipes.length > 0 ? (
                userRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.recipe_id}
                    recipeCardType="IsTrending"
                    recipe={recipe}
                  />
                ))
              ) : (
                <Text>No recipes created yet.</Text>
              )}
            </VStack>
          </Box>

          {/* Liked Recipes Section */}
          <Box mt={8}>
            <Heading as="h2" size="md" mb={4}>
              Liked Recipes
            </Heading>
            <VStack spacing={4} align="center">
              {likedRecipes.length > 0 ? (
                likedRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.recipe_id}
                    recipeCardType="IsTrending"
                    recipe={recipe}
                  />
                ))
              ) : (
                <Text>No liked recipes yet.</Text>
              )}
            </VStack>
          </Box>
        </Box>
      ) : (
        <Text>Loading...</Text>
      )}
    </Box>
  );
}

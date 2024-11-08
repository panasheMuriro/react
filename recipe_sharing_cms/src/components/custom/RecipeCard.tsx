import { Box, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export type Recipe = {
  recipe_id: string;
  title: string;
  description: string | null;
  cooking_time: string | null;
  ingredients: string[];
  steps: string[];
  createdBy: string;
  createdAt: string;
};

export type RecipeCardProps = {
    recipeCardType: "IsTrending" | "IsExplore",
    recipe: Recipe
}

export default function RecipeCard({ recipeCardType, recipe }: RecipeCardProps) {

    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/recipe/${recipe.recipe_id}`, { state: { recipe } });
      };

  return (
    <Box
    onClick={handleCardClick}
      w={recipeCardType === "IsTrending" ? "75vw" : "45vw"}
      bg="wheat"
      p={4}
      borderRadius="md"
      boxShadow="md"
    >
      <Box h={200} w="100%" bg="gray.200" mb={4}>Image</Box>
      <VStack align="start">
        <Text fontSize="lg" fontWeight="bold">{recipe.title}</Text>
        <Text fontSize="sm" color="gray.600">by Username</Text>
        {recipe.description && <Text fontSize="sm">{recipe.description}</Text>}
      </VStack>
    </Box>
  );
}

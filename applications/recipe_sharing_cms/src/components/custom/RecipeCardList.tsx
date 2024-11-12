import { useDbData } from "@/utils/firebase";
import RecipeCard, { Recipe} from "./RecipeCard";
import { useEffect } from "react";
import { Box, SimpleGrid, HStack } from "@chakra-ui/react";

export default function RecipeCardList({ recipeCardType }: { recipeCardType: "IsTrending" | "IsExplore" }) {
  const [recipesData] = useDbData("my_recipe_collection/recipes/");

  useEffect(() => {
    if (recipesData) {
      console.log(Object.values(recipesData));
    }
  }, [recipesData]);

  // Display recipes as a scrollable list for "IsTrending" and as a grid for "IsExplore"
  return (
    <>
      {recipesData && (
        recipeCardType === "IsTrending" ? (
          <HStack overflowX="auto" width={"100vw"} py={4}>
            {(Object.values(recipesData) as Recipe[]).map((recipe, index) => (
              <Box key={recipe.recipe_id}>
                <RecipeCard key={index} recipeCardType={recipeCardType} recipe={recipe} />
              </Box>
            ))}
          </HStack>
        ) : (
  
          <SimpleGrid columns={2} py={4} alignItems="center" >
            {(Object.values(recipesData) as Recipe[]).map((recipe, index) => (
              <Box key={recipe.recipe_id}>
                <RecipeCard key={index} recipeCardType={recipeCardType} recipe={recipe} />
              </Box>
            ))}
          </SimpleGrid>
        )
      )}
    </>
  );
}

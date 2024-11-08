import { HStack, IconButton, Text, VStack, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useDbData, useDbUpdate } from "@/utils/firebase";

type RatingComponentProps = {
  recipeId: string;
};

export default function RatingComponent({ recipeId }: RatingComponentProps) {
  const user_id = "2jnasasdasdybfd2w3gr393wy4h3hr02uw";

  // Fetch user and recipe data
  const [userData] = useDbData(`my_recipe_collection/users/${user_id}`);
  const [recipeData] = useDbData(`my_recipe_collection/recipes/${recipeId}`);
  const [updateUserData] = useDbUpdate(`my_recipe_collection/users/${user_id}`);
  const [updateRecipeData] = useDbUpdate(
    `my_recipe_collection/recipes/${recipeId}`
  );

  // Initial states
  const initialUserRating = userData?.rated_recipes?.[recipeId]?.rating || 0;
  const [rating, setRating] = useState<number>(initialUserRating);
  const [tempRating, setTempRating] = useState<number>(initialUserRating);
  const [isRating, setIsRating] = useState<boolean>(false);

  useEffect(() => {
    // Sync state if user data changes
    if (userData?.rated_recipes?.[recipeId]?.rating) {
      setRating(userData.rated_recipes[recipeId].rating);
      setTempRating(userData.rated_recipes[recipeId].rating);
    }
  }, [userData, recipeId]);

  const handleRatingStart = () => {
    setIsRating(true);
  };

  const handleSaveRating = async () => {
    setIsRating(false);
    setRating(tempRating);

    // Check if user has already rated to prevent double-counting
    const userPreviousRating = userData?.rated_recipes?.[recipeId]?.rating || 0;
    const currentRatingData = recipeData?.rating || { count: 0, value: 0 };

    // Calculate new total value, considering the previous rating if it exists
    const newValue = currentRatingData.value - userPreviousRating + tempRating;
    const newAverage =
      currentRatingData.count === 0
        ? tempRating
        : newValue / currentRatingData.count;

    // Update user rating in user data
    const updatedUserRatings = {
      ...userData.rated_recipes,
      [recipeId]: { rating: tempRating },
    };
    await updateUserData({ rated_recipes: updatedUserRatings });

    // Update recipe rating in recipe data
    await updateRecipeData({
      rating: {
        count: currentRatingData.count,
        value: newValue,
        average: newAverage,
      },
    });

    console.log(`Saved rating of ${tempRating} stars for recipe ${recipeId}`);
  };

  return (
    <VStack width="100%" spacing={3}>
      <Text fontSize="md" color="gray.600" >
        Rating: {recipeData?.rating?.average?.toFixed(1) || "N/A"} / 5
      </Text>
      <Text >Rate this recipe:</Text>

      {isRating ? (
        <HStack align="center">
          {[1, 2, 3, 4, 5].map((rate) => (
            <IconButton
              key={rate}
              onClick={() => setTempRating(rate)}
              aria-label={`Rate ${rate}`}
              colorScheme={rate <= tempRating ? "yellow" : "gray"}
              variant="ghost"
            >
              {rate <= tempRating ? <FaStar color="gold" /> : <FaRegStar />}
            </IconButton>
          ))}
          <Button onClick={handleSaveRating} colorScheme="blue">
            Save
          </Button>
        </HStack>
      ) : (
        <Button onClick={handleRatingStart} color="black">
          Rate
        </Button>
      )}
    </VStack>
  );
}

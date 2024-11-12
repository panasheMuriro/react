import Navbar from '@/components/custom/Navbar';
import RecipeCard from '@/components/custom/RecipeCard';
import RecipeCardList from '@/components/custom/RecipeCardList';
import { Box } from '@chakra-ui/react';

export default function HomePage() {



  return (
    <Box overflowY="scroll">
    <Navbar hasBackButton={false}/>
    <div>Trending</div>
    <RecipeCardList recipeCardType='IsTrending' />
    <h2>Explore recipes</h2>
    <RecipeCardList recipeCardType='IsExplore' />
    <RecipeCardList recipeCardType='IsExplore' />
    </Box>
  );
}

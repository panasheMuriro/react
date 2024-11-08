import { Box, Button, HStack, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

type NavbarProps = {
  hasBackButton: boolean;
};

export default function Navbar({ hasBackButton }: NavbarProps) {
  const navigate = useNavigate();
  const handleNavigateBack = () => {
    navigate(-1);
  };

  const handleProfileClick = () => {
    navigate("/profile"); // Redirect to the profile page route
  };

  return (
    <Box
      position="sticky"
      top="0"
      zIndex="1000"
      bg="white"
      boxShadow="md"
      p={4}
    >
      <HStack justifyContent="space-between">
        <Box>
          {hasBackButton ? 
            <Button color="black" onClick={handleNavigateBack}>
              {" "}
              back{" "}
            </Button>
            :
            <></>  
          }
          
        </Box>
        <Text fontSize="xl" fontWeight="bold">
          My Recipe
        </Text>
        <Box>
          <IconButton
            onClick={handleProfileClick}
            aria-label="Profile"
            variant="ghost"
            size="lg"
          >
            <FaUser />
          </IconButton>
        </Box>
      </HStack>
    </Box>
  );
}

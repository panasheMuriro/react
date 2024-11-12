// import React from 'react';

import { useDbUpdate } from "@/utils/firebase";
// import { useEditable } from "@chakra-ui/react";
import { useEffect } from "react";

export default function Admin() {
  const id = "2jnasasdasdybfd2w3gr393wy4h3hr02uw";
  const [addUser] = useDbUpdate("my_recipe_collection/users/" + id);

  useEffect(() => {
    addUser({
      userId: id,
      username: "Deborah S. Oneal",
      email: "Deborah S. Oneal@example.com",
      favorites: [],
      savedRecipes: [],
    });
  }, []);

  return <>Admin</>;
}

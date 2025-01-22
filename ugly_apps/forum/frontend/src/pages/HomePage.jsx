import { useNavigate } from "react-router-dom";
import PostList from "../components/PostList";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const goToCreatePost = () => {
    navigate("/create-post");
  };

  const [username, setUsername] = useState("");
  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  return (
    <>
      <p>Hi {user ? username : "guest,"} </p>
      <h1>Welcome to the Forum</h1>
      <button onClick={goToCreatePost}>+ Create post</button>
      <PostList />
    </>
  );
};

export default HomePage;

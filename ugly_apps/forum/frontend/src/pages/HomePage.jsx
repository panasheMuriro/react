import { useNavigate } from "react-router-dom";
import PostList from "../components/PostList";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const HomePage = () => {

  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  const goToCreatePost = () => {
  navigate("/create-post")
  }

  return <>
  <p>Hi {user ? user.username: ""} </p>
  <h1>Welcome to the Forum</h1>
  <button onClick={goToCreatePost}>+ Create post</button>
  <PostList/>
  </>
};

export default HomePage;

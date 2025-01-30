import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  const goToMyCourses = () => {
    navigate("/my-courses");
  };

  return (
    <>
      <p>Hi {user ? username : "guest,"} </p>
      <h1>Welcome to the Course Enrollment</h1>
      <button onClick={goToMyCourses}>My Courses</button>
    </>
  );
};

export default HomePage;

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { createPost } from "../api/postApi";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = document.getElementById("post-form");
    const formData = new FormData(form); // Gather form data
    let postTitle = formData.get("post-title");
    let postContent = formData.get("post-content");

    let data = {
      title: postTitle,
      content: postContent,
      userId: user.user_id || 1,
    };
    let res = await createPost(data.title, data.content, data.userId);
    if (res && res.status) {
      alert("Posted successfully");
      navigate("/");
    }
  };

  return (
    <div>
      <h1>Create a post</h1>
      <form
        id="post-form"
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleFormSubmit}
      >
        <label htmlFor="post-title">Title</label>
        <input required id="post-title" name="post-title" />
        <label htmlFor="post-content">Content</label>
        <textarea required id="post-content" name="post-content" rows={10} />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default CreatePost;

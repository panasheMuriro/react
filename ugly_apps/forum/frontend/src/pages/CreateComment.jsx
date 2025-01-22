import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { createComment, getPostById } from "../api/postApi";
import { useNavigate, useParams } from "react-router-dom";

function CreateComment() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState();

  useEffect(() => {
    getPostById(postId).then((res) => {
      if (res && res.statusText == "OK") {
        setPost(res.data);
      }
    });
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (postId == undefined) {
      alert("Post id not defined");
      return;
    }

    const form = document.getElementById("comment-form");
    const formData = new FormData(form); // Gather form data
    let commentContent = formData.get("comment-content");

    let data = {
      content: commentContent,
      userId: user.user_id || 1,
      postId: postId || 1,
    };

    let res = await createComment(data.postId, data.content, data.userId);
    if (res && res.status) {
      alert("Comment posted successfully");
      navigate(-1);
    }
  };

  return (
    <div>
      {post && (
        <>
          <h2>{post.title}</h2>
          <div>{post.content}</div>
          <b>posted by {post.user.email}</b>
          <hr></hr>
        </>
      )}

      <h3>Add a comment</h3>
      <form
        id="comment-form"
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleFormSubmit}
      >
        {/* <label htmlFor="comment-title">Title</label>
        <input required id="comment-title" name="comment-title" /> */}
        <label htmlFor="comment-content">Content</label>
        <textarea
          required
          id="comment-content"
          name="comment-content"
          rows={10}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default CreateComment;

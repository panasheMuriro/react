import { useNavigate, useParams } from "react-router-dom";
import { getPostById } from "../api/postApi";
import { useEffect } from "react";
import { useState } from "react";

function Post() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState();
  // use params

  useEffect(() => {
    getPostById(postId).then((res) => {
      if (res && res.statusText == "OK") {
        setPost(res.data);
      }
    });
  }, []);

  const goToCreateComment = () => {
    navigate("/create-comment/" + postId);
  };

  return post ? (
    <div>
      <h2>{post.title}</h2>
      <div>{post.content}</div>
      <b>
        posted by {post.user.email} at {post.dateCreated}
      </b>
      <hr></hr>
      <button onClick={goToCreateComment}>+ Create Comment</button>
      <h3>Comments</h3>

      {post.comments.map((comment, index) => (
        <div key={index}>
          <div>{comment.content}</div>
          <div>{comment.dateCreated}</div>
          <br></br>
        </div>
      ))}
    </div>
  ) : (
    <div></div>
  );
}

export default Post;

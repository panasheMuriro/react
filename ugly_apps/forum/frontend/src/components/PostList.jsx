import { useEffect } from "react";
import { getPosts } from "../api/postApi";
import { useState } from "react";
import moment from "moment";

export default function PostList() {
  const [posts, setPosts] = useState();
  useEffect(() => {
    getPosts().then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div>
      {posts &&
        posts.map((post, index) => (
          <div key={index}>
            <hr></hr>
            <b>{post.title}</b>
            <p>{post.content}</p>
            <p>
              by {post.user.email}, {moment(post.dateCreated).fromNow()}
            </p>

            <a href={"/post/" + post.id}>Comments: {post.commentCount}</a>
          </div>
        ))}
    </div>
  );
}

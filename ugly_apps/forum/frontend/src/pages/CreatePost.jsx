import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function CreatePost() {



    const {  user } = useContext(AuthContext);

    console.log(user)

    

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.values)

        const form = document.getElementById('post-form');
        const formData = new FormData(form); // Gather form data
        let postTitle =  formData.get('post-title');
        let postContent = formData.get('post-content');

        
    }


  return (
    <div>
      <h1>Create a post</h1>
      <form id="post-form" style={{ display: "flex", flexDirection: "column" }} onSubmit={handleFormSubmit}>
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

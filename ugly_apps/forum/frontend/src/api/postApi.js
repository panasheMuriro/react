import httpClient from './httpClient';

// {
//     "title": "Post 1",
//     "content":"The first post",
//     "userId": 1
// }

export const createPost = async (title, content, userId) => {
  return httpClient.post('/posts/create', { title, content, userId });
};


export const getPosts = async() => {
    return httpClient.get('/posts');
}

export const getPostById = async(postId) => {
  return httpClient.get(`/posts/${postId}`);
}



export const createComment = async (postId, content, userId) => {
  // /comments/create/:postId
  return httpClient.post(`/comments/create/${postId}`, {userId, content, postId});

}

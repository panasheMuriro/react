import httpClient from './httpClient';
export const createPost = async (title, content, userId) => {
  return httpClient.post('/posts/create', { title, content, userId });
};

export const getPosts = async() => {
    return httpClient.get('/posts');
}

export const getPostById = async(postId) => {
  return httpClient.get(`/posts/${postId}`);
}

// Comment
export const createComment = async (postId, content, userId) => {
  return httpClient.post(`/comments/create/${postId}`, {userId, content, postId});

}

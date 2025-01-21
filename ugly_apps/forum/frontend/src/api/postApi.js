import httpClient from './httpClient';

// {
//     "title": "Post 1",
//     "content":"The first post",
//     "userId": 1
// }

export const create = async (title, content, userID) => {
  return httpClient.post('/posts/create', { title, content, userID });
};



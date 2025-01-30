import httpClient from './httpClient';
export const createCourse = async (name, description) => {
  return httpClient.post('/courses', { name, description });
};

export const getCourses = async() => {
    return httpClient.get('/courses');
}

// export const getPostById = async(postId) => {
//   return httpClient.get(`/posts/${postId}`);
// }


import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:3000/api/posts/";

class PostService {
  createPost(data) {
    return axios.post(API_URL, data, { headers: authHeader() });
  }

  getAllPost() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  getPostById(id) {
    return axios.get(API_URL + id, { headers: authHeader() });
  }

  deletePost(id) {
    return axios.delete(API_URL + id, { headers: authHeader() });
  }

  modifyPost(id, data) {
    return axios.put(API_URL + id, data, { headers: authHeader() });
  }

  likePost(id, userId) { 
    return axios.put(API_URL + id + "/" + userId,  { headers: authHeader() } );
  }
}

export default new PostService();

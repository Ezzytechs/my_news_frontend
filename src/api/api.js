import axios from "axios";

const API_URL = "http://localhost:5000/api/news";

export const fetchNews = async (page) => {
  try {
    const res = await axios.get(`${API_URL}?page=${page}&limit=3`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to fetch news.");
  }
};

export const fetchNewsById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to fetch news by ID.");
  }
};


export const createNews = async (newsData) => {
  try {
    const res = await axios.post(API_URL, newsData);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to create news.");
  }
};

export const likeNews = async (id) => {
  try {
    const res = await axios.post(`${API_URL}/${id}/like`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to like news.");
  }
};

export const disLikeNews = async (id) => {
  try {
    const res = await axios.post(`${API_URL}/${id}/dislike`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to dislike news.");
  }
};

export const deleteNews = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to delete news.");
  }
};

export const fetchNewsByTag = async (tag, page, limit = 3) => {
  try {
    const response = await axios.get(
      `${API_URL}/tags/${tag}?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch news by tag.");
  }
};
//Fetch news statistics
export const fetchNewsStats = async (page, limit = 3) => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch news statistics.");
  }
};

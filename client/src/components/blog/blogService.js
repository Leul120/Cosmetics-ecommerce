// src/services/blogService.js
import axios from 'axios';
import { blogs } from './blogs';
// const API_URL = 'http://makeup-api.herokuapp.com/api/v1/products.json?';

export const fetchBlogs = async () => {
  try {
    // const response = await axios.get(API_URL);
    return blogs
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

// src/api.js
import axios from "axios";

// Products API (Shop, ProductTable, AddProduct, Bed, Service, Sofa, Chair)
export const productsApi = axios.create({
  baseURL: process.env.REACT_APP_PRODUCTS_API,
});

// Feedback + Contact API (ProductDetail, AdminFeedbackList, Contact)
export const feedbackApi = axios.create({
  baseURL: process.env.REACT_APP_FEEDBACK_API,
});

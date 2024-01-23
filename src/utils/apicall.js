import axios from 'axios';

 const BASE_URL = "http://localhost:3000/api"

const axiosWithToken = () => {
  
  const instance = axios.create({
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
      'Content-Type': 'application/json',
    },
  });
  return instance;
};



export const fetchData = async (endpoint) => {
  try {

    const response = await axiosWithToken().get(`${BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postData = async (endpoint, data) => {
  try {
    const response = await axiosWithToken().post(`${BASE_URL}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const delteData = async (endpoint) => {
  try {
    const response = await axiosWithToken().delete(`${BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const updateData = async (endpoint) => {
    try {
      const response = await axiosWithToken().put(`${BASE_URL}/${endpoint}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  

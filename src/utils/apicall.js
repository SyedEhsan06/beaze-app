import axios from 'axios';

 const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;
 console.log("BASE_URL",BASE_URL)
// const BASE_URL = "https://beaze-app-git-main-syed-ehsans-projects.vercel.app/api"
const axiosWithToken = () => {
  
  const instance = axios.create({
    headers: {
      Authorization: `Bearer +918340263940`,
      Phone : '+918340263940',
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


export const deleteData = async (endpoint) => {
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
  

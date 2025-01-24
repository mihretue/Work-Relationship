import { getApiUrl } from "../utils/getApi";
import axios from "axios";
const API_URL = getApiUrl()

const postHeader = (body)=>{
    return {
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
}
}

// const getHeader = () => {
//     return {
//         method: 'GET',
//         headers: {
//             "Content-Type": "application/json",
//         }
//     };
// };
// Example getHeader function
export const getHeader = () => { 
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    console.error("Access token is missing");
    throw new Error("Access token is missing. Please log in.");
  }
  return { 
    method: "GET", // or POST/PUT/DELETE depending on your use case
    headers: {
      "Content-Type": "application/json",
       "Authorization": `Bearer ${accessToken}`
    },
  }};
  

export const createProject = (body)=>{
    return fetch(`${API_URL}companies/`, postHeader(body)).then((res)=> {
        res.json()
    })
}

export const getAllCompanies = () => {
    return fetch(`${API_URL}companies/`, getHeader()) // Pass the object returned by getHeader()
      .then((res) => res.json()) // Parse the response JSON
      .catch((error) => {
        console.error("Error fetching companies:", error);
        throw error; // Re-throw for further handling
      });
  };
  

export const getDataByUrl = (url) => {
    return fetch(`${API_URL}${url}`, getHeader()).then((res) => res.json());
  };

export const createUser = (body)=>{
  return fetch(`${API_URL}signup/`,postHeader(body)).then((res)=>{
    res.json()
  })
}


export const login = async (username, password) => {
  try {
      const url = 'http://127.0.0.1:8000/api/login/';
      console.log("Making request to:", url); // Log the URL being used

      const response = await axios.post("/api/login/", {
          username,
          password,
      });

      console.log("Response received:", response.data);

      if (response.data.token) {
          localStorage.setItem("token", response.data.token);
      } else {
          console.error("No token found in the response");
      }

      return response.data;
  } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error.message);
      throw error; 
  }
};
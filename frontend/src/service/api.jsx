import { getApiUrl } from "../utils/getApi";

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
export const getHeader = () => ({
    method: "GET", // or POST/PUT/DELETE depending on your use case
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if required
    },
  });
  

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
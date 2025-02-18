import { getApiUrl } from "../utils/getApi";
import axios from "axios";
import { showAlertNotification, showErrorNotification, showSuccessNotification } from "../common/notifications";
const API_URL = getApiUrl()
// import { Navigate } from "react-router-dom";


// const navigate = Navigate()
const postHeader = (body)=>{
  const accessToken = localStorage.getItem("accessToken")
//   if (!accessToken) {
//     throw new Error('No access token found');
// }
  return {
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(body)
}
}

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const response = await fetch(`${API_URL}token/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });
  
  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('accessToken', data.access);
    return data.access;
  } else {
    // Handle token refresh failure (e.g., log the user out)
    console.log('Failed to refresh token');
    return null;
  }
};

export const getHeader = () => { 
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    console.error("Access token is missing");
    throw new Error("Access token is missing. Please log in.");
  }
  return { 
    method: "GET", 
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
  }};
  
  const makeApiRequest = async (url, body) => {
    let accessToken = localStorage.getItem('accessToken');
  
    // Make the initial request
    let response = await fetch(url, postHeader(body));
  
    if (response.status === 401) {
      // Token is expired, refresh it
      accessToken = await refreshAccessToken();
  
      if (accessToken) {
        // Retry the original request with the new access token
        response = await fetch(url, postHeader(body));
      } else {
        // Handle logout or redirect to login page
        alert('Session expired. Please log in again.');
        window.location.href = '/';
        // Redirect to login page, etc.
      }
    }
  
    return response.json();
  };

const getApiRequest = async(url)=>{
  let accessToken = localStorage.getItem("accessToken")

  let response = await fetch(url, getHeader())

  if (response.status===401){
    // Token is expired, refresh it
    accessToken = await refreshAccessToken()
    if (accessToken){
      // Retry the original request with the new access token
      response = await fetch(url, getHeader())
      } else {
        // Handle logout or redirect to login page
        alert('Session expired. Please log in again.');
        // Redirect to login page, etc.
        }
        
  }
  return response.json()
}

export const createProject = async(body)=>{
  try {
    const response = await makeApiRequest(`${API_URL}companies/`, body);
    return response;  // Return the response after a successful request
  } catch (error) {
    console.error("Error creating project:", error);
    throw error; // Re-throw for further handling
  }
    }
export const getAllCompanies = async() => {
  try {
    const response = await getApiRequest(`${API_URL}companies/`);
    return response;  // Return the response after a successful request
  } catch (error) {
    console.error("Error creating project:", error);
    throw error; // Re-throw for further handling
  }
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
      console.log("Making request to:", url); 

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



// forwarding function

export const forwardToDirector = async (Id,onSuccess,onError) => {
  const accessToken = localStorage.getItem('accessToken');
  
  try {
    const response = await fetch(`${API_URL}companies/${Id}/forward_to_director/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      onSuccess(data); // Call the success callback
    } else {
      const error = await response.json();
      onError(error); // Call the error callback
    }
  } catch (error) {
    console.error("Error forwarding project:", error);
    showErrorNotification("Error forwarding project:", 'Erorr')
    onError(error);
  }
};


export const approveCompany =(companyId,remark=null)=>{
  const accessToken = localStorage.getItem('accessToken');
  const url = `${API_URL}companies/${companyId}/approve/`;
  const data = {remark:remark};
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(data)
      };
      return fetch(url,options)
      .then(response => {
        if (response.ok) {
          return response.json();
          }
          throw new Error(response.statusText);
          })
          .catch(error => {
            console.error('Error approving company:', error);
            return error;
            });

}

export const SearchByTin= async(tinNumber)=>{
  const accessToken = localStorage.getItem('accessToken');
  const url = `${API_URL}companies/search-by-tin/?tin_number=${tinNumber}`;
  try {
    const response = await getApiRequest(url);
    console.log("Api Response :",response)
    return response;  // Ensure this returns the actual response
  } catch (error) {
    console.error("Error in SearchByTin:", error);
    throw error; // Re-throw for further handling
  }

}


export const StatusUpdate = async(companyId,projectId,status)=>{
  const accessToken = localStorage.getItem("accessToken")
  const url = `${API_URL}companies/${companyId}/projects/${projectId}/status/`
  const data = {status:status}
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(data)
      };
      return fetch(url,options)
      .then(response => {
        if (response.ok) {
          return response.json();
          }
          throw new Error(response.statusText);
          })
          .catch(error => {
            console.error('Error updating status:', error);
            return error;
            });
}



export const editCompany = async (companyId,updateData)=>{
  const accessToken = localStorage.getItem("accessToken");
  const url = `${API_URL}companies/${companyId}/`;
  const data = updateData
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(data)
      };
      return fetch(url,options)
      .then(response => {
        if (response.ok) {
          return response.json();
          }
          throw new Error(response.statusText);
          })
          .catch(error => {
            console.error('Error updating company:', error);
            return error;
            });
            
} 

export const deleteProjects = async (companyId, projectId) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const url = `${API_URL}companies/${companyId}/projects/${projectId}/delete/`;

    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Failed to delete: ${response.status} ${response.statusText}`);
    }

    // Check if there's a JSON response
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    console.log("Delete API Response:", data);
    return data; // Ensure response is returned

  } catch (error) {
    console.error("Error deleting project:", error);
    showAlertNotification("Error deleting project", "Error");
    return null; // Prevents 'undefined' errors
  }
};

export const getDeletedProjects = async(companyId)=>{
  try {
    const accessToken = localStorage.getItem("accessToken");
    const url = `${API_URL}companies/${companyId}/projects/delete/`;

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Failed to fetch deleted projects: ${response.status} ${response.statusText}`);
    }

    // Check if there's a JSON response
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    console.log("fetch Delete API Response:", data);
    return data; // Ensure response is returned

  } catch (error) {
    console.error("Error fetching deleted project:", error);
    showAlertNotification("Error deleting project", "Error");
    return null; // Prevents 'undefined' errors
  }

}
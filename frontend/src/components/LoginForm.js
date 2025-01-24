import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login } from "../service/api";
// import Cookies from 'js-cookie'


const LoginForm = () => {
  const {  loading } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // useNavigate instead of useHistory
const [formData, setFormData ]= useState({
  username: '',
  password: '',
})
const [error, setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    
const url = 'http://127.0.0.1:8000/api/login/'
    try{
        const response = await fetch(url,{
          method:"POST",
          headers:{
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${accessToken}`,
            // 'X-CSRFToken': csrftoken,
          },
          body: JSON.stringify({
            username:username,
            password:password}),

        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      if(response.ok){
        const data = await response.json()
        const role = data.role
        const accessToken = data.access
        const refreshToken = data.refresh

        localStorage.setItem('role',role)
        localStorage.setItem('accessToken',accessToken)
        localStorage.setItem('refreshToken',refreshToken)

        if(role === "team_leader"){
          navigate("/teamleader/dashboard")
        }else if (role ==="director"){
          navigate("director/dashboard")
        }else{
          navigate("/admin/dashboard")
        }
      }
      
  } catch (error) {
      console.error('Login error:', error.message);
      setError('Login failed. Please try again.'); // Set an error message for the user
  }
};

  return (
    <form onSubmit={handleSubmit}>
    {/* {% csrf_token %} */}
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {loading ? (
        <button type="button" disabled>
          Loading...
        </button>
      ) : (
        <button type="submit">Login</button>
      )}
    </form>
  );
};

export default LoginForm;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Attempt login using username and password
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username,
        password,
      });

      if (response.data.success) {
        // Store username and password in localStorage (Base64 encode for Basic Auth)
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('userRoles',response.data.roles)

        // Redirect based on roles
        if (response.data.roles.includes('ROLE_ADMIN')) {
          navigate('/admin-dashboard'); // Redirect to Admin Dashboard
        } else if (response.data.roles.includes('ROLE_STUDENT')) {
          navigate('/student-dashboard'); // Redirect to Student Dashboard
        }
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Login error', error);
      alert('Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

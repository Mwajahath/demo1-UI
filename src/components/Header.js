// src/components/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  // Fetch the user's role from localStorage (or state if stored there)
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');
  const roles = localStorage.getItem('userRoles'); // Fetch stored roles

  // Determine the role (Admin or Student) based on roles
  const isAdmin = roles && roles.includes('ROLE_ADMIN');
  const isStudent = roles && roles.includes('ROLE_STUDENT');

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('userRoles');
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <header style={styles.header}>
      <h1>{isAdmin ? 'Admin Dashboard' : isStudent ? 'Student Dashboard' : 'Welcome'}</h1>
      <div>
        {username && <span>Logged in as: {username}</span>}
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

// Basic styling for the header
const styles = {
  header: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    cursor: 'pointer',
  },
};

export default Header;

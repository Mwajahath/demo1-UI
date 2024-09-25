// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import CourseList from './components/CourseList';
import Header from './components/Header';
import Login from './components/Login'; // Import the Login component
import ProtectedRoute from './components/ProtectedRoute';
import StudentDashboard from './components/StudentDashboard';

function App() {
  return (
    <Router>
      <div>
        <h1>Course Management System</h1>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
        </Routes>
       
      </div>
    </Router>
  );
}

export default App;

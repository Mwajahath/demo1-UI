// src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import axios from 'axios';
const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    instructor: ''
  });

  // Fetch courses when component mounts
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
  
    // Base64 encode the username and password
    const token = btoa(`${username}:${password}`);
  
    try {
      const response = await axios.get('http://localhost:8080/api/courses', {
        headers: {
          'Authorization': `Basic ${token}`,  // Set Basic Auth header
          'Content-Type': 'application/json'
        }
      });
      setCourses(response.data);  // Assuming setCourses is defined elsewhere
    } catch (error) {
      console.error('Error fetching courses', error);
    }
  };

  // Handle new course input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value
    }));
  };

  // Handle adding new course
  const addCourse = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/courses', newCourse);
      fetchCourses(); // Refresh courses after adding a new one
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  // Handle course deletion
  const deleteCourse = async (id) => {
    try {
      await axiosInstance.delete(`/courses/${id}`);
      fetchCourses(); // Refresh courses after deletion
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <h3>Manage Courses</h3>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h4>{course.title}</h4>
            <p>{course.description}</p>
            <p>Instructor: {course.instructor}</p>
            <button onClick={() => deleteCourse(course.id)}>Delete Course</button>
          </li>
        ))}
      </ul>

      <h3>Add New Course</h3>
      <form onSubmit={addCourse}>
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={newCourse.title}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Course Description"
          value={newCourse.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="instructor"
          placeholder="Instructor Name"
          value={newCourse.instructor}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AdminDashboard;

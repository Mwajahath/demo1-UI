// src/components/CourseList.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig'; // Import your Axios instance
import axios from 'axios';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
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

    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Available Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>Instructor: {course.instructor}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;

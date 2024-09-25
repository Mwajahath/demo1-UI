// src/components/StudentDashboard.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [profile, setProfile] = useState({});

  // Fetch student courses and profile when component mounts
  useEffect(() => {
    fetchCourses();
    fetchProfile();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axiosInstance.get('/students/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get('/students/profile');
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  return (
    <div>
      <h2>Student Dashboard</h2>

      <h3>My Profile</h3>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      <p>Course: {profile.course}</p>

      <h3>My Courses</h3>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h4>{course.title}</h4>
            <p>{course.description}</p>
            <p>Instructor: {course.instructor}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;

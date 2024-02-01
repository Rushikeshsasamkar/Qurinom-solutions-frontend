import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateProfile = () => {
  const backendApi ='https://qurinom-backend-cc6y.onrender.com'
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    // Add more fields as needed
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user details based on the authentication token
        const response = await axios.get(`${backendApi}/updateprofile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Make a PUT request to update the user profile
      const response = await axios.put(`${backendApi}/updateprofile`, userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      // Check if the user profile was updated successfully
      if (response.status === 200) {
        console.log('User Profile Updated!');
      } else {
        console.log('Failed to update user profile:', response.data.error);
      }
    } catch (error) {
      console.error('Error updating user profile:', error.message);
    }
  
    // Redirect to the user's profile or another appropriate page
    // Adjust the redirection logic based on your application flow
  };
  

  return (
    <div>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            required
          />
        </label>
        {/* Add more fields as needed */}
        <br />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;

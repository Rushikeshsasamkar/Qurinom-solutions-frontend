// Loginpage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Loginpage.css'




const Loginpage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const backendApi ='https://qurinom-backend-cc6y.onrender.com'
  // const backendApi='https://qurinom-solutions-banckend.vercel.app/'

  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendApi}/login`, loginData);
      const { success, token, message } = response.data;

      if (success) {
        // Save the authentication token in local storage
        localStorage.setItem('token', token);

        // Update the isLoggedIn state in the parent component
        setIsLoggedIn(true);

        console.log('Login successful');
      } else {
        console.log(message);
        
      }

      navigate('/products');
    } catch (err) {
      console.log(err);
      window.alert("Enter the correct UserId / Password");
    }

    setLoginData({
      username: '',
      password: ''
    });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="login-container">
      <h1>Login page</h1>
      <form className='login-form' onSubmit={handleSubmit}>
        <input
          type="text"
          name='username'
          placeholder='Username'
          value={loginData.username}
          required
          onChange={handleLoginChange}
        />
        <br />
        <input
          type="password"
          name='password'
          placeholder='Password'
          required
          onChange={handleLoginChange}
          value={loginData.password}
        />
        <br />
        <br />
        <button type="submit">Submit</button>
        <p>
          <Link to='/registration'>Not registered?</Link>
        </p>
      </form>
    </div>
  );
};

export default Loginpage;

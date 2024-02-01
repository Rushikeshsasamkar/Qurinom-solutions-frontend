// Navbar.jsx
import React, { useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');

    // Redirect to the login page
    navigate('/');
    window.location.reload();
  };
  
  return (
    <div className="navbar">
      <Link to='/login'>Login</Link>
      <Link to='/registration'>Registration</Link>
      <Link to='/products'>Products</Link>
      <Link to='/addproduct'>Add Product</Link>
      <Link to='/updateprofile'>Update Profile</Link>
      <button onClick={handleLogout}>Logout</button>

        
    </div>
  );
};

export default Navbar;

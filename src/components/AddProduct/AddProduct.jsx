import React, { useState } from 'react';
import axios from 'axios';
import './AddProduct.css'
import {useNavigate} from 'react-router-dom'



const AddProduct = ({ onAddProduct, products }) => {
  const navigate = useNavigate();
  const backendApi ='https://qurinom-backend-cc6y.onrender.com'
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    price: '',
    image: null,  // Initialize image as null
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    
    // If the input type is file (for image), use the files property
    const inputValue = type === 'file' ? e.target.files[0] : value;

    setProductData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', productData.title);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('image', productData.image);

      // Make sure to retrieve the JWT token from local storage
      const token = localStorage.getItem('token');

      // Include the token in the headers of the Axios request
      const response = await axios.post(
        `${backendApi}/addproduct`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',  // Set content type for form data
          },
        }
      );

      // Check if the product was added successfully
      if (response.status === 201) {
        console.log('Product Added!');
        // Call the onAddProduct function with the new product data
        onAddProduct(productData);
      } else {
        console.log('Failed to add product:', response.data.err);
      }
    } catch (error) {
      console.error('Error adding product:', error.message);
    }

    window.alert('Product added!');
    navigate('/products');

    // Clear the form fields
    setProductData({
      title: '',
      description: '',
      price: '',
      image: null,
    });
  };

  return (
    <div className='addproduct-container'>
      <h2>Add New Product</h2>
      <form className='addproduct-form' onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={productData.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Image:
          <input
            type="file"
            name="image"
            onChange={handleInputChange}
            accept="image/*"  // Allow only image files
          />
        </label>
        <br />
        <button type="submit">Add Product</button>
      </form>
      <hr />
    </div>
  );
};

export default AddProduct;

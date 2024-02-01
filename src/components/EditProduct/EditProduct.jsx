import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
const backendApi ='https://qurinom-backend-cc6y.onrender.com'

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    title: '',
    description: '',
    price: '',
    image: '', // Add image field to state
  });

  useEffect(() => {
    console.log('Fetching product details...');
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${backendApi}/products/${productId}`);
        console.log('Response:', response.data);
        setProductData(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
          console.log('Product not found.');
          // You can navigate to an error page or handle it as needed
        } else {
          console.error('Error fetching product details:', error);
        }
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductData((prevData) => ({
      ...prevData,
      image: file, // Update image field with the selected file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', productData.title);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('image', productData.image); // Append the image file to the form data

      // Make a PUT request to update the product
      const response = await axios.put(`${backendApi}/editproduct/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Check if the product was updated successfully
      if (response.status === 200) {
        console.log('Product Updated!');
        window.alert('Product updated');
      } else {
        console.log('Failed to update product:', response.data.error);
      }
    } catch (error) {
      console.error('Error updating product:', error.message);
    }

    // Navigate back to the Products page
    navigate('/products');
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
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
          Previous Image: {productData.image && <img src={`${backendApi}/uploads/${productData.image}`} alt="Previous" style={{ maxWidth: '100px' }} />}
        </label>
        <br />
        <label>
          New Image:
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleImageChange}
          />
        </label>
        <br />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;

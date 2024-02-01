import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from your backend route
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [products]);

  const handleEdit = (productId) => {
    // Navigate to the editproduct route with the product ID as a parameter
    navigate(`/editproduct/${productId}`);
  };

  const handleDelete = async (productId) => {
    try {
      // Make a DELETE request to your backend to delete the product
      const response = await axios.delete(`http://localhost:8000/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Check if the product was deleted successfully
      if (response.status === 200) {
        console.log('Product Deleted!');
        // Optionally, you can update the state or perform any other actions after deletion
      } else {
        console.log('Failed to delete product:', response.data.error);
      }
    } catch (error) {
      console.error('Error deleting product:', error.message);
    }
  };

  return (
    <div>
      <h2>Products</h2>
      <Link to='/addproduct'><h1>Add new Product</h1></Link>

      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <h3>{product.title}</h3>
            <p>Description: {product.description}</p>
            <p>Price: ₹ {product.price}</p>
            {product.image && (
              <img
                src={`http://localhost:8000/uploads/${product.image}`}
                alt={product.title}
                style={{ maxWidth: '100px' }} // Set the maximum width as needed
              />
            )}
            <button onClick={() => handleEdit(product._id)}>Edit</button>
            &nbsp;
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;

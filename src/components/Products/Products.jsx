import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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

  // Filter products based on the search term
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='outer-div'>
      <h1>Products</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="product-container">
        {filteredProducts.map((product, index) => (
          <div key={index} className="product-card">
            {product.image && (
              <img
                src={`http://localhost:8000/uploads/${product.image}`}
                alt={product.title}
              />
            )}
            <div className="product-details">
              <h3 className='title'>{product.title}</h3>
              <p className='description'><span style={{ fontWeight: 'bold' }}>Description: </span>{product.description}</p>
              <p className='price'>Price: ₹ {product.price}</p>
            </div>
            <div className="product-actions">
              <button className="edit" onClick={() => handleEdit(product._id)}>
                Edit
              </button>
              <button className="delete" onClick={() => handleDelete(product._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

// App.jsx
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage/Loginpage';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import Products from './components/Products/Products';
import AddProduct from './components/AddProduct/AddProduct';
import EditProduct from './components/EditProduct/EditProduct';
import Navbar from './components/Navbar/Navbar';
import UpdateProfile from './components/UpdateProfile/UpdateProfile';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [products, setProducts] = useState([]); // Add this line

  const onAddProduct = (productData) => {
    // Add the new product to the existing array of products
    setProducts((prevProducts) => [...prevProducts, productData]);
  };

  return (
    <div>
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route
            path='/'
            element={<LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path='/registration'
            element={<RegistrationPage isLoggedIn={isLoggedIn} />}
          />

          {isLoggedIn ? (
            <>
              <Route
                path='/addproduct'
                element={<AddProduct onAddProduct={onAddProduct} products={products} />} // Pass products to AddProduct
              />
              <Route path='/updateprofile' element={<UpdateProfile />} />
              <Route path='/products' element={<Products productData={products} />} />
              <Route path='/editproduct/:productId' element={<EditProduct />} />
            </>
          ) : (
            // Redirect to login if not logged in
            <Route path='*' element={<Navigate to='/' />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

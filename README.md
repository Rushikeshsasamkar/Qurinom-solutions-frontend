# Qurinom MERN stack Assignment:

## Overview

This project is an E-Commerce application that allows users to sign up, log in, log out, update their profile, create products with multiple variants, search for products, update product information, and delete products. The application provides a user-friendly interface for managing products and user accounts.

## Features

### 1. User Authentication

#### Sign Up

- Users can create an account by providing a unique username and a password.
- Duplicate username handling to ensure each user has a unique identity.
- Server-side validation for registration.

#### Login

- Users can log in using their registered username and password.
- Token-based authentication for secure access to protected routes.

#### Logout

- Users can log out to terminate their session.
- Automatic redirection to the login page after logging out.

#### Update Profile

- Users can update their profile information, including changing their password.
- Secure handling of profile updates with proper validation.

### 2. Product Management

#### Create Product

- Users with the necessary permissions can add new products.
- Products can have multiple variants, such as different models or versions (e.g., iPhone 13, iPhone 14, iPhone 15).
- Users can upload images for product variants.

#### Search Products

- Users can search for products based on their title or other attributes.
- The search functionality allows for a seamless product discovery experience.

#### Update Product

- Users can modify the information of existing products, including title, description, price, and image.
- The system supports updating details for individual product variants.

#### Delete Product

- Users can delete unwanted products or variants.
- Confirmation prompts and server-side checks to prevent accidental deletions.

## Technologies Used

- **Frontend:**
  - React.js for building the user interface.
  - React Router for navigation between different views.
  - Axios for making HTTP requests to the backend.

- **Backend:**
  - Node.js and Express.js for building the server.
  - MongoDB for storing user data, product information, and variant details.
  - Mongoose as an ODM (Object-Document Mapper) for MongoDB.

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd e-commerce-application
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up the backend:
   - Ensure MongoDB is installed and running.
   - Create a `.env` file in the `backend` directory with the following content:

     ```env
     MONGODB_URI=<your-mongodb-connection-string>
     JWT_SECRET=<your-jwt-secret>
     ```

5. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

6. Start the frontend application:

   ```bash
   cd ..
   npm start
   ```

7. Access the application in your browser at `http://localhost:3000`.

## Project Structure

```
e-commerce-application/
|-- backend/                  # Backend server
|   |-- controllers/         # Route controllers
|   |-- models/               # Database models
|   |-- routes/               # Express routes
|   |-- uploads/              # Directory to store uploaded images
|   |-- .env                  # Environment variables
|   |-- index.js              # Main server file
|-- src/                      # Frontend source code
|   |-- components/           # React components
|   |-- pages/                # React pages
|   |-- App.js                # Main application component
|   |-- index.js              # Entry point for React app
|-- .gitignore                # Git ignore file
|-- README.md                 # Project readme
|-- package.json              # Node.js dependencies
```

## Additional Notes

- The application uses token-based authentication. Ensure that your server-side environment variables (`JWT_SECRET`) are securely configured.

- For security reasons, this readme does not include sensitive information such as actual connection strings or secret keys. Replace placeholders with your actual values.

- The project structure may evolve as the application grows. Keep it organized and follow best practices for scalability.

## Credits

This project is created by [Your Name] as part of [any relevant course or personal project]. Feel free to contribute or provide feedback to enhance the application.
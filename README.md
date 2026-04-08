# Contact Management System

A full-stack web application for managing personal contacts with user authentication, CRUD operations, and duplicate merging functionality.

## Project Overview

This application consists of two main components:

- **Backend**: Node.js/Express API server with MongoDB database
- **Frontend**: React web application with Bootstrap UI

### Features

- User registration and login with JWT authentication
- Create, read, update, and delete contacts
- Contact validation (name fields must contain only letters, email and phone have regex validation)
- Duplicate contact detection and merging by email or phone
- Responsive UI with Bootstrap styling
- Protected routes requiring authentication

## Technologies Used

### Backend

- **Node.js** with **Express.js** for the server framework
- **MongoDB** with **Mongoose** for database and ODM
- **JWT (jsonwebtoken)** for authentication tokens
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests
- **dotenv** for environment variable management

### Frontend

- **React** with **React Router** for client-side routing
- **Axios** for HTTP requests to the backend API
- **Bootstrap** for responsive UI components
- **React Testing Library** and **Jest** for testing

### Design Choices

- **Duplicate Handling**: The system allows duplicate contacts by email or phone but provides a merge functionality to remove duplicates, keeping the oldest entry.
- **Validation**: Strict validation on contact fields to ensure data quality (e.g., names only letters, phone 10 digits).
- **Authentication**: JWT-based auth with token storage in localStorage for session management.
- **Separation of Concerns**: Clear separation between backend API and frontend UI, allowing for independent development and deployment.
- **Responsive Design**: Bootstrap ensures the application works well on various screen sizes.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or cloud service like MongoDB Atlas)
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd contacts-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `contacts-backend` directory with the following variables:

   ```
   MONGO_URI=mongodb://localhost:27017/contactdb
   JWT_SECRET=your_jwt_secret_key_here
   ```

   - Replace `mongodb://localhost:27017/contactdb` with your MongoDB connection string if using a different setup.
   - Choose a secure JWT secret key.

4. Start the backend server:

   ```bash
   node server.js
   ```

   The server will run on `http://localhost:5000` and connect to MongoDB. It will also create a dummy user (username: "dummy", password: "password") and sample contacts if they don't exist.

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd contacts-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

   The application will open in your browser at `http://localhost:3000`.

### Running the Application

1. Ensure MongoDB is running.
2. Start the backend server (step 4 above).
3. Start the frontend development server (step 3 above).
4. Open `http://localhost:3000` in your browser.
5. Login with username "dummy" and password "password" (or register a new user).

## API Documentation

### Authentication Endpoints

#### POST /auth/register

Register a new user.

- **Body**: `{ "username": "string", "password": "string", "role": "Admin"|"User" }`
- **Response**: `{ "message": "User registered successfully" }`

#### POST /auth/login

Login and receive JWT token.

- **Body**: `{ "username": "string", "password": "string" }`
- **Response**: `{ "token": "jwt_token_string" }`

### Contact Endpoints (All require Authorization header: `Bearer <token>`)

#### POST /contacts

Create a new contact.

- **Body**: Contact object (see schema below)
- **Response**: Created contact object

#### GET /contacts

Get all contacts.

- **Response**: Array of contact objects

#### GET /contacts/:id

Get a specific contact by ID.

- **Response**: Contact object

#### PUT /contacts/:id

Update a contact by ID.

- **Body**: Updated contact object
- **Response**: Updated contact object

#### DELETE /contacts/:id

Delete a contact by ID.

- **Response**: `{ "message": "Contact deleted" }`

#### POST /contacts/merge

Merge duplicate contacts by email or phone (keeps oldest entry).

- **Response**: `{ "message": "Merged X duplicate contacts" }`

### Contact Schema

```json
{
  "firstName": "string (required, letters only)",
  "lastName": "string (required, letters only)",
  "email": "string (optional, valid email format)",
  "phone": "string (optional, 10 digits)",
  "address": "string (optional)"
}
```

## Testing

### Backend

- No specific test scripts configured. Run `npm test` (currently echoes an error message).

### Frontend

- Run tests with `npm test`
- Tests use Jest and React Testing Library

## Deployment

### Backend

- For production, consider using a process manager like PM2
- Set environment variables appropriately
- Ensure MongoDB is accessible

### Frontend

- Build for production: `npm run build`
- Serve the `build` folder with a static server or deploy to a hosting service

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and test
4. Submit a pull request

## License

ISC License

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

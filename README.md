
# Assignment Solution

This project is a full-stack blog application built using **NestJS**, **ReactJS**, and **MongoDB**. The backend is powered by NestJS and connects to a MongoDB database, while the frontend is built with ReactJS and styled using Tailwind CSS. JWT is used for authentication, and Docker is used for containerizing the application to ensure smooth deployment and setup.

## Getting Started

### Prerequisites
Ensure that you have Docker installed on your system. Docker Compose is also required to build and start the application.

### Quick Start
1. Clone the repository to your local machine.
2. Run the following command in the root of the project to build and start all services:

   ```bash
   docker-compose up --build
3. This will start the MongoDB database, backend (NestJS), and frontend (ReactJS) in the correct sequence.

### Running Backend and Frontend Separately

Alternatively, you can navigate to the backend or frontend directories and follow the specific instructions given in each README.md file within those directories to start them individually.

### Additional Information

- **Backend:** API services and MongoDB configuration. JWT-based authentication is implemented.

- **Frontend:** UI components styled with Tailwind CSS, form handling with React Hook Form, and state management using Redux.

 - **Docker Setup**

The Docker Compose setup ensures the following sequence:

1. MongoDB database

2. Backend (NestJS)

3. Frontend (ReactJS)

This sequence ensures that the database is ready when the backend starts, and the backend is ready when the frontend starts.

## Tech Stack
- **Backend**: NestJS, MongoDB, JWT for authentication
- **Frontend**: ReactJS, Tailwind CSS, React Toastify, React Hook Form, React Redux, React Router DOM

## Project Dependencies

### Frontend Dependencies
- **tailwindCSS**: For utility-first CSS styling.
- **react-toastify**: To display toast notifications for user feedback.
- **react-hook-form**: Simplifies form handling with validation.
- **react-redux**: For state management across the application.
- **react-router-dom**: For routing within the React application.

### Backend Dependencies

- **@nestjs/jwt**: For JWT authentication support in NestJS.
- **@nestjs/mongoose**: Integration with MongoDB using Mongoose in NestJS.
- **bcryptjs**: Used for hashing passwords securely.
- **dotenv**: Loads environment variables from a `.env` file, making configuration easier.
- **mongoose**: MongoDB object modeling tool used with NestJS for data persistence.
- **multer**: Middleware for handling multipart/form-data, mainly for handling file uploads.



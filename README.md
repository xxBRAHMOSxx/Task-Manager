Deployed application : https://task-manager-6wbc.onrender.com

# Project Description
this project is a full-stack web application designed to manage user authentication and note-taking functionalities. It is built using modern web technologies, including React for the frontend and Node.js with Express for the backend. The application is structured to provide a seamless user experience with secure authentication and efficient state management.

# Frontend
Framework: React
State Management: Redux Toolkit
API Integration: RTK Query for data fetching and caching
Styling: CSS  
Key Featuresd
User Authentication:

Login: Users can log in using their credentials. The login form handles input validation and displays error messages for invalid attempts.
State Management: Authentication state is managed using Redux, ensuring that user credentials are securely stored and accessible throughout the application.
API Integration: The frontend communicates with the backend to handle login requests and manage user sessions.
Note Management:

Create, Read, Update, Delete (CRUD): Users can create, view, update, and delete notes. Each note is associated with a user, ensuring that notes are private and secure.
User Interface: The application provides a user-friendly interface for managing notes, with forms for creating and editing notes and a list view for displaying existing notes.

# Backend
Framework: Node.js with Express
Database: MongoDB for data storage
Authentication: JWT (JSON Web Tokens) for secure authentication
Logging: Middleware for logging requests and errors
Key Features
User Management:

Registration: Users can register for an account. The backend handles user creation and stores user information securely in the database.
Authentication: The backend verifies user credentials and issues JWT tokens for authenticated sessions.
Note Management:

CRUD Operations: The backend provides endpoints for creating, reading, updating, and deleting notes. Each operation is secured to ensure that only authenticated users can manage their notes.

# Middleware:

Error Handling: Custom middleware for handling errors and logging them to files.
CORS: Configured to allow cross-origin requests from the frontend.
Rate Limiting: Limits the number of login attempts to prevent brute-force attacks.


# ScreenShots

![Screenshot 2024-11-15 183007](https://github.com/user-attachments/assets/5efe01f4-38d8-4338-820a-f8ffffccab79)

![Screenshot 2024-11-15 201713](https://github.com/user-attachments/assets/5f3cafff-3844-4d81-9104-b22374221f53)

![Screenshot 2024-11-15 201649](https://github.com/user-attachments/assets/327d0fe2-4734-4041-97b2-5b4afb085a49)

 * To run this project locally clone the repo and change cors allowed origin under config/backend and baseURl under api/app/frontend *

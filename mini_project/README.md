# Mini Project

## Overview
This project is a web application that provides weather information and user authentication. It utilizes MongoDB for data storage, Passport for authentication, and various services for sending SMS and emails.

## Project Structure
- **public/**: Contains static files such as CSS, JavaScript, images, and videos.
- **config/**: Configuration files for database connection and authentication setup.
  - **db.js**: MongoDB connection setup using Mongoose.
  - **passport.js**: Passport configuration for user authentication.
- **middleware/**: Custom middleware for authentication and error handling.
  - **authMiddleware.js**: Middleware for user authentication.
  - **errorHandler.js**: Centralized error handling middleware.
- **models/**: Database models using Mongoose schemas.
  - **User.js**: User schema definition.
  - **Weather.js**: Schema for storing weather search history.
- **controllers/**: Contains business logic for handling requests.
  - **userController.js**: Functions for user authentication logic.
  - **weatherController.js**: Functions for fetching and processing weather data.
- **routes/**: API routes for handling requests.
  - **userRoutes.js**: Routes for user authentication.
  - **weatherRoutes.js**: Routes for fetching weather data.
- **services/**: External services for APIs, SMS, and Email.
  - **weatherService.js**: Fetches weather data from an external API.
  - **smsService.js**: Twilio SMS service integration.
  - **emailService.js**: SendGrid email service integration.
- **views/**: Frontend HTML templates (EJS, Handlebars).
- **.env**: Environment variables for configuration.
- **.gitignore**: Specifies files to ignore in Git.
- **package.json**: Project dependencies and metadata.
- **README.md**: Project documentation.
- **server.js**: Main server entry point.

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd mini_project
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Set up environment variables in the `.env` file.
5. Start the server:
   ```
   node server.js
   ```

## Usage
- Access the application in your web browser at `http://localhost:3000`.
- Use the authentication routes to register and log in.
- Fetch weather data by using the weather routes.

## Contributing
Feel free to submit issues or pull requests for improvements or bug fixes. 

## License
This project is licensed under the MIT License.
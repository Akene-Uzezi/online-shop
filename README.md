# Online Shop

## Project Overview

This project is an online shop application that allows users to browse products, add them to their cart, and complete purchases. The application is designed with a user-friendly interface and follows best practices in web development.

## Features
- User authentication and authorization
- Product browsing and searching
- Shopping cart functionality
- Order management

## Technology Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: MongoDB

## Environment Variables Setup

To run this project seamlessly, you'll need to set up the following environment variables:

1. **DATABASE_URL**: This is the URI for your MongoDB database.
   - Example: `mongodb://localhost:27017/online-shop`

2. **SECRET_KEY**: A random secret key used for session management.
   - Example: `myVerySecretKey`

3. **PORT**: The port on which your server will run.
   - Example: `3000`

4. **NODE_ENV**: Set this to `development` for the development environment or `production` for a production environment.
   - Example: `development`

Make sure to create a `.env` file in the root of your project and add the above environment variables accordingly.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Akene-Uzezi/online-shop.git
   ```
2. Navigate into the project directory:
   ```bash
   cd online-shop
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```

## Testing

To run tests, use the following command:
```bash
npm test
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
const jwt = require('jsonwebtoken');

// Replace this with your actual JWT_SECRET from the .env file
const JWT_SECRET = 'your_jwt_secret'; // Make sure to match with your .env file


const payload = {
    userId: 1, // Example userId
    role: 'admin', // Example role
};

// Define token options like expiration time
const options = {
    expiresIn: '24h', // Token will expire in 24 hour
};

// Generate the token
const token = jwt.sign(payload, JWT_SECRET, options);

console.log('Generated Token:', token);

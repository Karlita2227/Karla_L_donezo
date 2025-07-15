// Import the jsonwebtoken library
import jwt from 'jsonwebtoken';

// Middleware to verify JWT from the Authorization header
const verifyToken = (req, res, next) => {
  try {
    // Get the token from the Authorization header (e.g., "Bearer <token>")
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token missing' });
    }

    // Verify the token using the secret key stored in your .env file
    const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);

    // Attach decoded user info to the request for use in next middleware/routes
    req.user = decoded;

    // Move to the next middleware or route handler
    next();
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export default verifyToken;

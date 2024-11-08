import { JWT_SECRET } from './config.js'; // Assuming config.js is the correct file path
import jwt from 'jsonwebtoken';

// Now you can use the imported variables and modules as needed in your code

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({});
    }
};

export { authMiddleware };

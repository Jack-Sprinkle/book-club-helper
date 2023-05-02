import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send('Please login');
    } else {
        const authHeader = req.headers.authorization;
        const authToken = authHeader.split(' ')[1];
        const decoded = jwt.verify(authToken, process.env.JWT_KEY)
        req.user = decoded;
        return next()
    }
}

export default authMiddleware;
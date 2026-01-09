import jwt from 'jsonwebtoken';

export const authenticateUserJWT = (req, res, next) => {
    const token = req.cookies.userToken;
    if (!token) return res.json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (err) {
        return res.json({ message: 'Invalid token' });
    }
};

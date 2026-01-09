import jwt from 'jsonwebtoken';

export const createUserToken = ({ id, fullname, username }) => {
    return jwt.sign(
        { id, fullname, username },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );
};

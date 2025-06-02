import jwt from 'jsonwebtoken';

const verifying = ({ payload, SECRET_KEY }) => {
    return jwt.verify(payload, SECRET_KEY);
}

export default verifying;
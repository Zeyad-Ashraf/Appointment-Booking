import jwt from 'jsonwebtoken';

const signing = async ({ payload, SECRET_KEY, expire }) => {
    return jwt.sign(payload, SECRET_KEY, expire);
}

export default signing;
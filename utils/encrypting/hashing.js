import bcrypt from 'bcrypt';

const hashed = async (key) => {
    return bcrypt.hashSync(key, Number(process.env.SALT_ROUNDS));
}
export default hashed;
import bcrypt from "bcrypt";

const comparePassword = async ({ key, hashed }) => {
    return await bcrypt.compare(key, hashed);
}

export default comparePassword;
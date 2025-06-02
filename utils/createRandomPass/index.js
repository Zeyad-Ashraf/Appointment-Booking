import { nanoid } from 'nanoid';

const createRandomPass = async () => {
    return nanoid(10);
}

export default createRandomPass;
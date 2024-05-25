const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = [];

const register = async (request, h) => {
    console.log('Received payload for register:', request.payload); 
    const { username, password } = request.payload;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword };
    users.push(user);

    return h.response({ message: 'User berhasil didaftarkan' }).code(201);
};

const login = async (request, h) => {
    console.log('Received payload for login:', request.payload);
    const { username, password } = request.payload;
    const user = users.find(u => u.username === username);

    if (!user) {
        return h.response({ message: 'Username atau password salah!' }).code(401);
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return h.response({ message: 'Username or password salah!' }).code(401);
    }

    const token = jwt.sign({ username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });

    return h.response({ token }).code(200);
};

module.exports = {
    register,
    login
};

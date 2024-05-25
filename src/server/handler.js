const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = []; // Simpan pengguna sementara dalam memori

const register = async (request, h) => {
    const { username, password } = request.payload;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword };
    users.push(user);

    return h.response({ message: 'User berhasil didaftarkan' }).code(201);
};

const login = async (request, h) => {
    const { username, password } = request.payload;
    const user = users.find(u => u.username === username);

    if (!user) {
        return h.response({ message: 'Username or password salah!' }).code(401);
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
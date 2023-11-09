const User = require("../models/user.model");
const { createJWT } = require("../utils/authTokenUtils");
const bcrypt = require('bcrypt');

const getAllUser = async (req, res) => {
    try {
        const allUser = await User.find()

        res.status(200).json({
            status: 200,
            users: allUser
        })
    } catch (error) {
        res.status(400).json({ status: 400, error: error.message });
    }
}

const createUser = async (req, res) => {
    const { username, password } = req.body;
    const saltRounds = 10;

    try {
        const ifUserNameAvailable = await User.findOne({ username: username })
        if (ifUserNameAvailable) {
            return res.status(400).json({ status: 400, message: 'Username already existed.' });
        }
        if (password.length < 8) {
            return res.status(400).json({ status: 400, message: 'Password is too short. Provide 8 characters at least.' });
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({ username, password: hashedPassword });

        await newUser.save();
        res.json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(401).json({ error: 'Invalid username' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ status: 401, error: 'Invalid password' });
        }
        if (isMatch) {
            const token = await createJWT(user);
            return res.status(200).json({
                status: 200,
                message: 'Logged in successfully.',
                data: {
                    username: user.username,
                    role: user.role,
                    token: token
                }
            })
        }

        // Generate and send a JWT token upon successful authentication
        // const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
        // res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getAllUser,
    createUser,
    loginUser
}
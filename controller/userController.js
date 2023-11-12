const User = require("../models/user.model");
const { createJWT } = require("../utils/authTokenUtils");
const bcrypt = require('bcrypt');

const getAllUser = async (req, res) => {
    try {
        const allUser = await User.find().select("-password")

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
        res.json({
            status: 200,
            message: 'User registered successfully',
            user: newUser
        });
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
            return res.status(401).json({ status: 401, error: 'Invalid username' });
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
                    _id: user._id,
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

const deleteUser = async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id)
        if (user?.role === 'admin') {
            return res.status(401).json({
                status: 401,
                message: 'You can not delete an admin'
            })
        }
        const removedUser = await User.findByIdAndDelete(id)
        return res.status(200).json({
            status: 200,
            userId: removedUser?._id,
            message: 'User deleted successfully.'
        })
    } catch (error) {
        return res.status(400).json({
            status: 400,
            error: error.message
        })
    }
}



module.exports = {
    getAllUser,
    createUser,
    loginUser,
    deleteUser
}
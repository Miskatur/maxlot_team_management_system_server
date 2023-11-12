import User from "../models/user.model";
import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import { authTokenUtils } from "../utils/authTokenUtils";

export const getAllUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const allUser = await User.find().select("-password")

        res.status(200).json({
            status: 200,
            users: allUser
        })
    } catch (error: any) {
        res.status(400).json({ status: 400, error: error.message });
    }
}

export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    const saltRounds = 10;

    try {
        const ifUserNameAvailable = await User.findOne({ username: username })
        if (ifUserNameAvailable) {
            res.status(400).json({
                status: 400, message: 'Username already existed.'
            });
            return;
        }
        if (password.length < 8) {
            res.status(400).json({ status: 400, message: 'Password is too short. Provide 8 characters at least.' });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({ username, password: hashedPassword });

        await newUser.save();
        res.status(200).json({
            status: 200,
            message: 'User registered successfully',
            user: newUser
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ username: username });

        if (!user) {
            res.status(401).json({ status: 401, error: 'Invalid username' });
            return;
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(401).json({ status: 401, error: 'Invalid password' });
            return;
        }
        if (isMatch) {
            const token = await authTokenUtils.createJWT(user);
            res.status(200).json({
                status: 200,
                message: 'Logged in successfully.',
                data: {
                    _id: user._id,
                    username: user.username,
                    role: user.role,
                    token: token
                }
            })
            return;
        }

        // Generate and send a JWT token upon successful authentication
        // const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
        // res.json({ token });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id
    try {
        const user = await User.findById(id)
        if (user?.role === 'admin') {
            res.status(401).json({
                status: 401,
                message: 'You can not delete an admin'
            })
            return
        }
        const removedUser = await User.findByIdAndDelete(id)
        res.status(200).json({
            status: 200,
            userId: removedUser?._id,
            message: 'User deleted successfully.'
        })
        return
    } catch (error: any) {
        res.status(400).json({
            status: 400,
            error: error.message
        })
        return
    }
}



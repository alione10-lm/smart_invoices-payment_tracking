import bcrypt from "bcryptjs";
import User from "../models/User.model.js";

import { generateToken } from "../utils/generateToken.js";

const loginService = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    console.log(user);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({ id: user._id, role: user.role });

    return res
        .status(200)
        .json({ message: "Login successful", data: user, token });
};

const registerService = async (req, res) => {
    const { name, email, password, role } = req.body;

    const usersExists = await User.findOne({ email });
    if (usersExists) {
        return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role,
    });

    return res
        .status(201)
        .json({ message: "Registration successful", data: newUser });
};

export { loginService, registerService };

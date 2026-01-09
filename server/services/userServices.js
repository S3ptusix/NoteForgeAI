import { Users } from "../models/fk.js";
import bcrypt from "bcrypt";
import { validateUsername, validatePassword, validateFullName } from "../utils/validate.js";

import { createUserToken } from "../utils/token.js";
import { capitalizeWords, fixSpaces } from "../utils/format.js";

// REGISTER USER
export const RegisterUserService = async (fullname, username, password) => {
    try {


        if (!fullname?.trim() || !username?.trim() || !password?.trim()) {
            return {
                success: false,
                message: "Please complete all fields to proceed with account creation."
            };
        }
        const formatedFullname = capitalizeWords(fixSpaces(fullname));
        const formatedUsername = username.trim().toLowerCase();
        const formatedPassword = password.trim();
        console.log(formatedFullname)

        const fullnameError = validateFullName(formatedFullname);
        const usernameError = validateUsername(formatedUsername);
        const passwordError = validatePassword(formatedPassword);

        if (fullnameError) {
            return {
                success: false,
                message: fullnameError
            };
        }
        if (usernameError) {
            return {
                success: false,
                message: usernameError
            };
        }
        if (passwordError) {
            return {
                success: false,
                message: passwordError
            };
        }

        // Check if user already exists
        const existingUser = await Users.findOne({ where: { username } });
        if (existingUser) {
            return {
                success: false,
                message: "Username already in use"
            };
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(formatedPassword, saltRounds);

        // Create user
        const user = await Users.create({
            fullname: formatedFullname,
            username: formatedUsername,
            password: hashedPassword
        });

        const token = createUserToken({
            id: user.id,
            fullname: user.fullname,
            username: user.username
        });

        return {
            success: true,
            token
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}

// LOGIN USER
export const loginUserService = async (username, password) => {
    try {
        if (!username?.trim() || !password?.trim()) {
            return { success: false, message: "Please complete all fields" };
        }

        const user = await Users.findOne({ where: { username } });
        if (!user) return { success: false, message: "Wrong username or password!" };

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return { success: false, message: "Wrong username or password!" };

        const token = createUserToken({
            id: user.id,
            fullname: user.fullname, 
            username: user.username
        });

        return {
            success: true,
            token
        };

    } catch (error) {
        console.error(error);
        return { success: false, message: "Server error" };
    }
};
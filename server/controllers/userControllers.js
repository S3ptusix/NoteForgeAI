import { editUserService, loginUserService, RegisterUserService } from "../services/userServices.js";
import { cookieOptions } from "../utils/cookie.js";

// REGISTER USER
export const RegisterUserController = async (req, res) => {
    try {
        const { fullname, username, password } = req.body;
        const result = await RegisterUserService(fullname, username, password);
        if (!result.success) {
            return res.json({ success: false, message: result.message })
        }

        res.cookie('userToken', result.token, cookieOptions);

        return res.json({
            success: true,
            message: "Login successfully"
        });
    } catch (error) {
        console.error("Error on RegisterUserController:", error);
        return res.json({ success: false, message: "Server error" });
    }
};

// LOGIN USER
export const LoginUserController = async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await loginUserService(username, password);
        if (!result.success) {
            return res.json({ success: false, message: result.message })
        }

        res.cookie('userToken', result.token, cookieOptions);

        return res.json({
            success: true,
            message: "Login successful"
        });
    } catch (error) {
        console.error("Error on LoginUserController:", error);
        return res.json({ success: false, message: "Server error" });
    }
};
 
// EDIT USER
export const editUserController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { fullname, username, currentPassword, newPassword } = req.body;
        const result = await editUserService(userId, fullname, username, currentPassword, newPassword);
        if (!result.success) {
            return res.json({ success: false, message: result.message })
        }

        res.cookie('userToken', result.token, cookieOptions);

        return res.json({
            success: true,
            message: "Edit profile successful"
        });
    } catch (error) {
        console.error("Error on LoginUserController:", error);
        return res.json({ success: false, message: "Server error" });
    }
};

// FETCH ME USER
export const meUserController = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.json({
                success: false,
                user: null
            });
        }

        return res.json({
            success: true,
            user: {
                id: user.id,
                fullname: user.fullname,
                username: user.username,
            }
        });

    } catch (error) {
        console.error("Error on meUserController:", error);
        return res.json({
            success: false,
            user: null,
            message: "Server error"
        });
    }
};

// LOGOUT USER
export const logoutUserController = (req, res) => {
    res.clearCookie('userToken', cookieOptions);
    return res.json({ success: true, message: 'Logged out successfully' });
};
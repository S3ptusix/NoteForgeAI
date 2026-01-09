import { Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";
import { handleRegister } from "../services/userServices";
import { toast } from "react-toastify";

export default function Register({ onClose, switchModal = () => { } }) {

    const [viewPassword, setViewPassword] = useState(false);

    const [userInput, setUserInput] = useState({
        fullname: "",
        username: "",
        password: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "username") {
            e.target.value = value.toLowerCase().replace(/\s+/g, '');
        }

        if (name === "password") {
            e.target.value = value.replace(/\s+/g, '');
        }

        setUserInput(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const { success, message } = await handleRegister(userInput);
            if (success) {
                onClose();
                return toast.success(message);
            };
            return toast.error(message);
        } catch (error) {
            console.error('Error on handleSubmit:', error);
        }
    }

    return (
        <div className="modal-style">
            <div>
                <div className="modal-title">
                    <p className="font-semibold text-lg">Create Account</p>
                    <button
                        className="btn btn-square btn-ghost"
                        onClick={onClose}
                    >
                        <X className="text-gray-700" />
                    </button>
                </div>
                <p className="text-sm text-gray-700 mb-2 font-semibold">Full Name</p>
                <input
                    name="fullname"
                    type="text"
                    placeholder="Nick her"
                    className="input w-full mb-4"
                    onChange={handleInputChange}
                />

                <p className="text-sm text-gray-700 mb-2 font-semibold">Username</p>
                <input
                    name="username"
                    type="text"
                    placeholder="Username123"
                    className="input w-full mb-4"
                    onChange={handleInputChange}
                />

                <p className="text-sm text-gray-700 mb-2 font-semibold">Password</p>
                <div className="input w-full mb-4 outline-blue-600">
                    <input
                        name="password"
                        type={viewPassword ? "text" : "password"}
                        placeholder="••••••••"
                        onChange={handleInputChange}
                    />
                    <button
                        className="btn btn-square bg-transparent border-0 text-gray-400"
                        onClick={() => setViewPassword(prev => !prev)}
                    >
                        {viewPassword ? <Eye /> : <EyeOff />}
                    </button>
                </div>

                <button
                    className="btn bg-blue-600 text-white w-full"
                    onClick={handleSubmit}
                >
                    Sign Up
                </button>
                <div className="flex items-center justify-center gap-1 mt-4">
                    <span className="text-gray-700">
                        Already have an account?
                    </span>
                    <button
                        className="text-blue-600 font-semibold cursor-pointer"
                        onClick={switchModal}
                    >
                        Log in
                    </button>
                </div>
            </div>
        </div>
    )
}
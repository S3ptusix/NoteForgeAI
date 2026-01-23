import { Eye, EyeOff, X } from "lucide-react";
import { useContext, useState } from "react";
import { handleLogin } from "../services/userServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loadUser } from "../services/authServices";
import { UserContext } from "../context/AuthProvider";
import Loading from "./Loading";

export default function Login({ onClose, switchModal = () => { } }) {

    const { setUser } = useContext(UserContext);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const [viewPassword, setViewPassword] = useState(false);

    const [userInput, setUserInput] = useState({
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
            setLoading(true);
            const { success, message } = await handleLogin(userInput);
            if (success) {
                onClose();
                const result = await loadUser();
                setUser(result);
                navigate('/app', { replace: true });
                return
            };
            return toast.error(message);
        } catch (error) {
            console.error('Error on handleSubmit:', error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <Loading />;

    return (
        <div className="modal-style">
            <div>
                <div className="modal-title">
                    <p className="font-semibold text-lg">Welcome Back</p>
                    <button
                        className="btn btn-square btn-ghost"
                        onClick={onClose}
                    >
                        <X className="text-gray-700" />
                    </button>
                </div>

                <p className="text-sm text-gray-700 mb-2 font-semibold">Username</p>
                <input
                    name="username"
                    type="text"
                    placeholder="username123"
                    className="input w-full mb-4"
                    onChange={handleInputChange}
                />

                <p className="text-sm text-gray-700 mb-2 font-semibold">Password</p>
                <div className="input w-full mb-4 outline-blue-600">
                    <input
                        name="password"
                        type={viewPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className=""
                        onChange={handleInputChange}
                    />
                    <button
                        className="btn btn-square bg-transparent border-0 text-gray-400"
                        onClick={() => setViewPassword(prev => !prev)}
                    >
                        {viewPassword ? <EyeOff /> : <Eye />}
                    </button>
                </div>

                <button
                    className="btn bg-blue-600 text-white w-full"
                    onClick={handleSubmit}
                >
                    Log In
                </button>
                <div className="flex items-center justify-center gap-1 mt-4">
                    <span className="text-gray-700">
                        Don't have an account?
                    </span>
                    <button
                        className="text-blue-600 font-semibold cursor-pointer"
                        onClick={switchModal}
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    )
}
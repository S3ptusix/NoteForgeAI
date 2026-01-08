import { Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";

export default function Login({ onClose, switchModal = () => { } }) {

    const [viewPassword, setViewPassword] = useState(false);

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
                    type="text"
                    placeholder="Username123"
                    className="input w-full mb-4"
                />

                <p className="text-sm text-gray-700 mb-2 font-semibold">Password</p>
                <div className="input w-full mb-4 outline-blue-600">
                    <input
                        type={viewPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className=""
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
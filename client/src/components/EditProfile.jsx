import { Eye, EyeOff, X } from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { editProfile } from "../services/userServices";
import { UserContext } from "../context/AuthProvider";

export default function EditProfile({ onClose }) {

    const { user } = useContext(UserContext);

    const [viewPassword, setViewPassword] = useState({
        new: false,
        current: false,
    });

    const [userInput, setUserInput] = useState({
        fullname: user.fullname || "",
        username: user.username || "",
        currentPassword: "",
        newPassword: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "username") {
            e.target.value = value.toLowerCase().replace(/\s+/g, '');
        }

        if (name === "currentPassword" || name === "newPassword" || name === "confirmPassword") {
            e.target.value = value.replace(/\s+/g, '');
        }

        setUserInput(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const { success, message } = await editProfile(userInput);
            if (success) {
                return window.location.reload();
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
                    <p className="font-semibold">Edit Profile</p>
                    <button
                        className="btn btn-square btn-ghost"
                        onClick={onClose}
                    >
                        <X />
                    </button>
                </div>
                <p className="text-sm text-gray-700 mb-2 font-semibold">Full Name</p>
                <input
                    name="fullname"
                    type="text"
                    placeholder="Jahleel Casintahan"
                    value={userInput?.fullname}
                    className="input w-full mb-4"
                    onChange={handleInputChange}
                />

                <p className="text-sm text-gray-700 mb-2 font-semibold">Username</p>
                <input
                    name="username"
                    type="text"
                    placeholder="username123"
                    value={userInput?.username}
                    className="input w-full mb-4"
                    onChange={handleInputChange}
                />

                <hr className="mb-4 border-gray-200" />
                <p className="text-sm text-gray-400 mb-2">Change Password (optional)</p>

                <p className="text-sm text-gray-700 mb-2 font-semibold">Current Password</p>
                <div className="input w-full mb-4 outline-blue-600">
                    <input
                        name="currentPassword"
                        type={viewPassword.current ? "text" : "password"}
                        placeholder="••••••••"
                        onChange={handleInputChange}
                    />
                    <button
                        className="btn btn-square bg-transparent border-0 text-gray-400"
                        onClick={() => setViewPassword(prev => ({ ...prev, current: !prev.current }))}
                    >
                        {viewPassword.current ? <EyeOff /> : <Eye />}
                    </button>
                </div>

                <p className="text-sm text-gray-700 mb-2 font-semibold">New Password</p>
                <div className="input w-full mb-4 outline-blue-600">
                    <input
                        name="newPassword"
                        type={viewPassword.new ? "text" : "password"}
                        placeholder="••••••••"
                        onChange={handleInputChange}
                    />
                    <button
                        className="btn btn-square bg-transparent border-0 text-gray-400"
                        onClick={() => setViewPassword(prev => ({ ...prev, new: !prev.new }))}
                    >
                        {viewPassword.new ? <EyeOff /> : <Eye />}
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <button
                        className="btn bg-white border-gray-300"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn bg-blue-600 text-white"
                        onClick={handleSubmit}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
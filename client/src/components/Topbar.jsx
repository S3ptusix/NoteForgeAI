import { BookOpen, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Register from "./Register";
import Login from "./Login";
import { UserContext } from "../context/AuthProvider";
import { logoutUser } from "../services/authServices";
import { toast } from "react-toastify";

export default function Topbar() {

    const navigate = useNavigate();

    const { user, setUser } = useContext(UserContext);

    const [modal, setModal] = useState(null); // "login" | "register" | null
    const [openUserMenu, setOpenUserMenu] = useState(false);

    const handleLogout = async () => {
        try {
            const { success, message } = await logoutUser();
            if (success) {
                setUser(null);
                navigate('/', { replace: true });
                return
            } else {
                toast.error(message);
            }
        } catch (error) {
            console.error('Error on handleSubmit:', error);
        }
    }

    return (
        <div className="flex items-center justify-between px-[10vw] py-4 border-b border-gray-300">

            <Link to="/" className="flex gap-2 text-blue-600 items-center">
                <BookOpen />
                <p className="font-semibold text-lg">NOTE2CARD</p>
            </Link>

            <div className="flex gap-2">
                {user ? (
                    <div className="relative">
                        <button
                            className="flex items-center gap-1 text-sm text-gray-700 cursor-pointer h-full outline-0"
                            onClick={() => setOpenUserMenu(prev => !prev)}
                        >
                            <User size={16} />
                            {user.fullname}
                        </button>
                        {openUserMenu && (
                            <div className="min-w-50 absolute top-[calc(100%+.5rem)] right-0 bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md">
                                <div className="p-2 text-sm">
                                    <p className="text-gray-700">Signed in as</p>
                                    <p>{user.username}</p>
                                </div>
                                <hr className="border-gray-200" />
                                <button
                                    className="flex items-center gap-2 text-sm p-2 w-full text-left text-red-600 hover:bg-red-600/25 cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <button
                            className="btn btn-white text-gray-700 border-gray-300"
                            onClick={() => setModal("login")}
                        >
                            Log in
                        </button>

                        <button
                            className="btn bg-blue-600 text-white"
                            onClick={() => setModal("register")}
                        >
                            Get Started
                        </button>
                    </>
                )}
            </div>

            {modal === "register" && (
                <Register
                    onClose={() => setModal(null)}
                    switchModal={() => setModal("login")}
                />
            )}

            {modal === "login" && (
                <Login
                    onClose={() => setModal(null)}
                    switchModal={() => setModal("register")}
                />
            )}
        </div>
    );
}

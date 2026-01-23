import { LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import Register from "./Register";
import Login from "./Login";
import { UserContext } from "../context/AuthProvider";
import { logoutUser } from "../services/authServices";
import { toast } from "react-toastify";
import EditProfile from "./EditProfile";
import Loading from "./Loading";

export default function Topbar() {

    const { user, setUser } = useContext(UserContext);

    const [modal, setModal] = useState(null); // "login" | "register" | null
    const [openUserMenu, setOpenUserMenu] = useState(false);
    const [openEditProfile, setOpenEditProfile] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        try {
            setLoading(true);
            const { success, message } = await logoutUser();
            if (success) {
                setUser(null);
                return
            } else {
                toast.error(message);
            }
        } catch (error) {
            console.error('Error on handleSubmit:', error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <Loading />;

    return (
        <div
            className="flex items-center justify-between px-[10vw] py-4 border-b border-gray-300"
        >

            <Link to={user ? "/app" : "/"} className="flex gap-2 text-blue-600 items-center">
                <img src="/noteForgeAiIcon.svg" className="h-8 w-8" alt="" />
                <p className="font-semibold text-lg">NoteForge AI</p>
            </Link>

            <div className="flex gap-2">
                {user ? (
                    <div className="relative">
                        <button
                            className="flex items-center gap-1 text-sm text-gray-700 cursor-pointer outline-0 max-md:btn max-md:btn-circle max-md:bg-blue-600 max-md:text-white"
                            onClick={() => setOpenUserMenu(prev => !prev)}
                        >
                            <User size={16} />
                            <p className="max-md:hidden">{user.fullname}</p>
                        </button>
                        {openUserMenu && (
                            <div className="min-w-50 absolute top-[calc(100%+.5rem)] right-0 bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md z-10">
                                <div className="p-2 text-sm">
                                    <p className="text-gray-700">Signed in as</p>
                                    <p>{user.username}</p>
                                </div>
                                <hr className="border-gray-200" />
                                <button
                                    className="flex items-center gap-2 text-sm p-2 w-full text-left text-gray-700 hover:bg-gray-700/10 cursor-pointer"
                                    onClick={() => setOpenEditProfile(true)}
                                >
                                    <User size={16} />
                                    Edit Profile
                                </button>
                                <button
                                    className="flex items-center gap-2 text-sm p-2 w-full text-left text-red-600 hover:bg-red-600/10 cursor-pointer"
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
                            className="btn btn-white text-gray-700 border-gray-300 max-md:hidden"
                            onClick={() => setModal("login")}
                        >
                            Log in
                        </button>

                        <button
                            className="btn bg-blue-600 text-white max-md:hidden"
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

            {openEditProfile &&
                <EditProfile
                    onClose={() => setOpenEditProfile(false)}
                />
            }
        </div>
    );
}

import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Register from "./Register";
import Login from "./Login";

export default function Topbar() {

    const [modal, setModal] = useState(null); // "login" | "register" | null

    return (
        <div className="flex items-center justify-between px-[10vw] py-4 border-b border-gray-300">

            <Link to="/" className="flex gap-2 text-blue-600 items-center">
                <BookOpen />
                <p className="font-semibold text-lg">NOTE2CARD</p>
            </Link>

            <div className="flex gap-2">

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

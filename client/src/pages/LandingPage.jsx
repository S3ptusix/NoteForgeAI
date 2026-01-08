import { Brain, Target, Zap } from "lucide-react";
import Topbar from "../components/Topbar";
import Login from "../components/Login";
import Register from "../components/Register";
import { useState } from "react";

export default function LandingPage() {

    const [modal, setModal] = useState(null); // "login" | "register" | null

    return (
        <div className="min-h-screen flex flex-col">
            <Topbar />
            <div className="grow bg-blue-50 px-[10vw]">
                <section className="text-center w-[min(600px,100%)] mx-auto my-20">
                    <p className="text-2xl font-semibold">Transform Your Notes Into</p>
                    <p className="text-2xl font-semibold text-blue-600">Powerful Flashcards</p>
                    <p className="text-lg my-8 text-gray-600">NOTE2CARD automatically generates flashcards from your notes using AI, helping you learn faster and retain information better.</p>
                    <button
                        className="btn btn-lg bg-blue-600 text-white rounded-lg"
                        onClick={() => setModal("register")}
                    >
                        Start Learning for Free
                    </button>
                </section>
                <section className="my-20">
                    <p className="text-center text-2xl font-semibold mb-20">Why NOTE2CARD?</p>
                    <div className="grid md:grid-cols-3 gap-16">
                        <div className="flex flex-col items-center">
                            <Zap className="bg-blue-600/10 text-blue-600 w-16 h-16 p-4  rounded-full" />
                            <p className="text-center text-lg font-semibold my-4">AI-Powered Generation</p>
                            <p className="text-center text-lg text-gray-600">Paste your notes and let our AI automatically create relevant flashcards in seconds.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Brain className="bg-green-600/10 text-green-600 w-16 h-16 p-4  rounded-full" />
                            <p className="text-center text-lg font-semibold my-4">Smart Study Mode</p>
                            <p className="text-center text-lg text-gray-600">Practice with focused study sessions that help reinforce your learning effectively.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Target className="bg-purple-600/10 text-purple-600 w-16 h-16 p-4  rounded-full" />
                            <p className="text-center text-lg font-semibold my-4">Organize Your Way</p>
                            <p className="text-center text-lg text-gray-600">Create unlimited decks, edit cards, and manage your study materials with ease.</p>
                        </div>
                    </div>
                </section>
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
    )
}
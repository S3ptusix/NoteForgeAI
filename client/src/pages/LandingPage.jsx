import { ArrowRight, BookOpen, FileText, Github, GraduationCap, Linkedin, Mail } from "lucide-react";
import Topbar from "../components/Topbar";
import Login from "../components/Login";
import Register from "../components/Register";
import { useState } from "react";

export default function LandingPage() {

    const [modal, setModal] = useState(null); // "login" | "register" | null

    return (
        <div className="min-h-screen flex flex-col">
            <Topbar />
            <div className="grow bg-blue-50">
                <section className="my-20 mx-[10vw]">
                    <div className="text-center w-[min(600px,100%)] mx-auto">
                        <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm mb-6">
                            ✨ AI-Powered Learning Tool
                        </div>
                        <p className="text-2xl font-semibold">Transform Your Notes Into</p>
                        <p className="text-2xl font-semibold text-blue-600">Flashcards, Quizzes & Reviewers</p>
                        <p className="text-lg my-8 text-gray-600">Automatically generate flashcards, interactive quizzes, and comprehensive reviewers from your notes. Study smarter with our intelligent AI-powered learning system.</p>
                        <button
                            className="btn btn-lg bg-blue-600 text-white rounded-lg"
                            onClick={() => setModal("register")}
                        >
                            Get Started
                            <ArrowRight />
                        </button>
                    </div>
                </section>
                <section className="my-20 mx-[10vw]">
                    <p className="text-center text-2xl font-semibold mb-20 mx-[10vw]">Why NoteForge AI?</p>
                    <div className="grid md:grid-cols-3 gap-16">
                        <div className="flex flex-col items-center p-6 hover:shadow-lg hover:bg-white rounded-lg duration-150">
                            <span className="flex-center bg-blue-600/10 text-blue-600 w-16 h-16 rounded-full">
                                <BookOpen className="w-8 h-8" />
                            </span>
                            <p className="text-center text-lg font-semibold my-4">Flashcard Generation</p>
                            <p className="text-center text-lg text-gray-600">Paste your notes and instantly create organized flashcards for effective spaced repetition study sessions.</p>
                        </div>
                        <div className="flex flex-col items-center p-6 hover:shadow-lg hover:bg-white rounded-lg duration-150">
                            <span className="flex-center bg-green-600/10 text-green-600 w-16 h-16 rounded-full">
                                <GraduationCap className="w-8 h-8" />
                            </span>
                            <p className="text-center text-lg font-semibold my-4">Interactive Quizzes</p>
                            <p className="text-center text-lg text-gray-600">Generate multiple-choice quizzes from your notes to test your knowledge and track your progress.</p>
                        </div>
                        <div className="flex flex-col items-center p-6 hover:shadow-lg hover:bg-white rounded-lg duration-150">
                            <span className="flex-center bg-purple-600/10 text-purple-600 w-16 h-16 rounded-full">
                                <FileText className="w-8 h-8" />
                            </span>
                            <p className="text-center text-lg font-semibold my-4">Smart Reviewers</p>
                            <p className="text-center text-lg text-gray-600">Create comprehensive study reviewers that summarize key concepts for efficient exam preparation.</p>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="py-16 px-8 bg-white rounded-xl mb-16 mx-[10vw]">
                    <h2 className="text-center mb-12">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl mb-4">
                                1
                            </div>
                            <h3 className="mb-2">Paste Your Notes</h3>
                            <p className="text-gray-600">
                                Copy and paste your study notes or lecture content
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl mb-4">
                                2
                            </div>
                            <h3 className="mb-2">Generate Cards</h3>
                            <p className="text-gray-600">
                                Select flashcards, quizzes, or reviewers based on your study needs
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl mb-4">
                                3
                            </div>
                            <h3 className="mb-2">Study & Master</h3>
                            <p className="text-gray-600">
                                Practice, test yourself, and master the material at your own pace
                            </p>
                        </div>
                    </div>
                </section>
                {/* Footer */}
                <footer className="relative bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700 py-12 overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '32px 32px'
                        }}></div>
                    </div>

                    <div className="relative max-w-7xl mx-auto px-6">
                        {/* Main Content */}
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <img src="/noteForgeAiIcon.svg" className="h-8 w-8" alt="" />
                                <span className="text-xl text-white">NoteForge AI</span>
                            </div>
                            <p className="text-gray-300 text-lg mb-1">© 2026 Jahleel Casintahan</p>
                            <p className="text-blue-400 text-sm tracking-wide">Web Developer</p>
                        </div>

                        {/* Divider */}
                        <div className="w-24 h-px bg-linear-to-r from-transparent via-blue-500 to-transparent mx-auto mb-6"></div>

                        {/* Social Links */}
                        <div className="flex items-center flex-wrap justify-center gap-6">
                            <a
                                href="https://github.com/S3ptusix"
                                target="_blank"
                                className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700 border border-gray-700 hover:border-blue-500 transition-all duration-300"
                            >
                                <Github className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">GitHub</span>
                            </a>
                            <a
                                href="https://github.com/S3ptusix/note2card" // replace with your repo
                                target="_blank"
                                className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700 border border-gray-700 hover:border-blue-500 transition-all duration-300"
                            >
                                <Github className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Source</span>
                            </a>


                            <a
                                href="https://www.linkedin.com/in/jahleel-casintahan-1616023a4/"
                                target="_blank"
                                className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700 border border-gray-700 hover:border-blue-500 transition-all duration-300"
                            >
                                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">LinkedIn</span>
                            </a>

                            <a
                                href="mailto:jahleelnemuel@gmail.com"
                                className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700 border border-gray-700 hover:border-blue-500 transition-all duration-300"
                            >
                                <Mail className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Email</span>
                            </a>
                        </div>

                        {/* Tagline */}
                        <p className="text-center text-gray-500 text-xs mt-8">
                            Built with passion for better learning experiences
                        </p>
                    </div>
                </footer>
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
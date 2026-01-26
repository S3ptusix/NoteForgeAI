/* eslint-disable no-unused-vars */
import { ArrowRight } from "lucide-react";
import Topbar from "../components/Topbar";
import Login from "../components/Login";
import Register from "../components/Register";
import { useState } from "react";
import { motion } from "motion/react"
import { fadeUp, staggerContainer } from "../animations/reveal";
import Footer from "../components/Footer";
import HowItWorks from "../components/HowItWorks";
import WhyNoteForgeAI from "../components/WhyNoteForgeAI";
import flashcard_quiz_reviewer from '../assets/flashcard_quiz_reviewer.png';

export default function LandingPage() {

    const [modal, setModal] = useState(null); // "login" | "register" | null

    return (
        <div className="min-h-screen flex flex-col">
            <Topbar />
            <div className="grow bg-blue-50">
                <section className="my-20 mx-[10vw]">
                    <motion.div
                        className="text-center w-[min(600px,100%)] mx-auto"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.8 }}
                    >

                        <motion.div
                            className="relative w-fit mx-auto p-0.5 text-blue-600 rounded-full text-sm mb-6 overflow-hidden"
                            variants={fadeUp}
                        >
                            <div className="relative bg-blue-100 px-4 py-2 rounded-full z-10">
                                ✨ AI-Powered Learning Tool
                            </div>
                            <div className="card-wrapper"></div>
                        </motion.div>

                        <motion.p
                            className="text-2xl font-semibold"
                            variants={fadeUp}
                        >
                            Transform Your Notes Into
                        </motion.p>

                        <motion.p
                            variants={fadeUp}
                            className="text-2xl font-semibold text-blue-600"
                        >
                            Flashcards, Quizzes & Reviewers
                        </motion.p>

                        <motion.img src={flashcard_quiz_reviewer}
                            variants={fadeUp}
                            className="my-8"
                        />

                        <motion.p
                            className="text-lg mb-8 text-gray-600"
                            variants={fadeUp}
                        >
                            Automatically generate flashcards, interactive quizzes, and
                            comprehensive reviewers from your notes. Study smarter with our
                            intelligent AI-powered learning system.
                        </motion.p>

                        <motion.button
                            className="btn btn-lg bg-blue-600 text-white rounded-lg inline-flex items-center gap-2"
                            variants={fadeUp}
                            onClick={() => setModal("register")}
                        >
                            Get Started
                            <ArrowRight />
                        </motion.button>
                    </motion.div>
                </section>
                <WhyNoteForgeAI />

                <HowItWorks />
                <Footer />
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
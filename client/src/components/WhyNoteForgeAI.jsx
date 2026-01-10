/* eslint-disable no-unused-vars */
import { BookOpen, GraduationCap, FileText } from "lucide-react";
import { motion } from "motion/react";
import { fadeLeft } from "../animations/reveal";

export default function WhyNoteForgeAI() {
    return (
        <section className="my-20 mx-[10vw]">
            <motion.p
                className="text-center text-2xl font-semibold mb-20 mx-[10vw]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: .8 }}
            >
                Why NoteForge AI?

            </motion.p>
            <div className="grid lg:grid-cols-3 gap-16">
                <motion.div
                    className="flex flex-col items-center p-6 hover:shadow-lg hover:bg-white/50 rounded-lg duration-150 cursor-default"
                    initial={fadeLeft.hidden}
                    whileInView={fadeLeft.show}
                    viewport={{ once: true, amount: .8 }}
                >
                    <span className="flex-center bg-blue-600/10 text-blue-600 w-16 h-16 rounded-full">
                        <BookOpen className="w-8 h-8" />
                    </span>
                    <p className="text-center text-lg font-semibold my-4">Flashcard Generation</p>
                    <p className="text-center text-lg text-gray-600">Paste your notes and instantly create organized flashcards for effective spaced repetition study sessions.</p>
                </motion.div>
                <motion.div
                    className="flex flex-col items-center p-6 hover:shadow-lg hover:bg-white/50 rounded-lg duration-150 cursor-default"
                    initial={fadeLeft.hidden}
                    whileInView={fadeLeft.show}
                    viewport={{ once: true, amount: .8 }}
                >
                    <span className="flex-center bg-green-600/10 text-green-600 w-16 h-16 rounded-full">
                        <GraduationCap className="w-8 h-8" />
                    </span>
                    <p className="text-center text-lg font-semibold my-4">Interactive Quizzes</p>
                    <p className="text-center text-lg text-gray-600">Generate multiple-choice quizzes from your notes to test your knowledge and track your progress.</p>
                </motion.div>
                <motion.div
                    className="flex flex-col items-center p-6 hover:shadow-lg hover:bg-white/50 rounded-lg duration-150 cursor-default"
                    initial={fadeLeft.hidden}
                    whileInView={fadeLeft.show}
                    viewport={{ once: true, amount: .8 }}
                >
                    <span className="flex-center bg-purple-600/10 text-purple-600 w-16 h-16 rounded-full">
                        <FileText className="w-8 h-8" />
                    </span>
                    <p className="text-center text-lg font-semibold my-4">Smart Reviewers</p>
                    <p className="text-center text-lg text-gray-600">Create comprehensive study reviewers that summarize key concepts for efficient exam preparation.</p>
                </motion.div>
            </div>
        </section>
    );
}
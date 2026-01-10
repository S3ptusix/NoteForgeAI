/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import { fadeLeft, staggerContainer } from "../animations/reveal";

export default function HowItWorks() {
    return (
        <section className="py-16 px-8 bg-white rounded-xl mb-16 mx-[10vw]">
            <motion.h2
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: .8 }}
            >
                How It Works

            </motion.h2>
            <motion.div
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.8 }}
            >
                <motion.div
                    className="flex flex-col items-center text-center"
                    variants={fadeLeft}
                >
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl mb-4">
                        1
                    </div>
                    <h3 className="mb-2">Paste Your Notes</h3>
                    <p className="text-gray-600">
                        Copy and paste your study notes or lecture content
                    </p>
                </motion.div>
                <motion.div
                    className="flex flex-col items-center text-center"
                    variants={fadeLeft}
                >
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl mb-4">
                        2
                    </div>
                    <h3 className="mb-2">Generate Cards</h3>
                    <p className="text-gray-600">
                        Select flashcards, quizzes, or reviewers based on your study needs
                    </p>
                </motion.div>
                <motion.div
                    className="flex flex-col items-center text-center"
                    variants={fadeLeft}
                >
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl mb-4">
                        3
                    </div>
                    <h3 className="mb-2">Study & Master</h3>
                    <p className="text-gray-600">
                        Practice, test yourself, and master the material at your own pace
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
}
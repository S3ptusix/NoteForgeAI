/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import { popup } from "../animations/reveal";
import step1 from '../assets/step-1.png';
import step2 from '../assets/step-2.png';
import step3 from '../assets/step-3.png';
import { useState } from "react";

export default function HowItWorks() {

    const [showImage, setShowImage] = useState(false);
    const [image, setImage] = useState(step1);

    const handleSelectImage = (img) => {
        setImage(img);
        setShowImage(true);
    }

    return (
        <section className="py-16 rounded-xl mb-16 mx-[10vw]">
            <motion.p
                className="text-center font-semibold text-2xl mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: .8 }}
            >
                How It Works

            </motion.p>
            <div
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
                <motion.div
                    className="hiw-card"
                    initial={popup.hidden}
                    whileInView={popup.show}
                    viewport={{ once: true, amount: .8 }}
                >
                    <div className="hiw-step">
                        1
                    </div>
                    <h3 className="mb-2">Paste Your Notes</h3>
                    <img
                        src={step1}
                        className="hiw-card-img"
                        onClick={() => handleSelectImage(step1)}
                    />
                    <p className="text-gray-300 mb-6">
                        Copy and paste your study notes or lecture content
                    </p>
                </motion.div>
                <motion.div
                    className="hiw-card"
                    initial={popup.hidden}
                    whileInView={popup.show}
                    viewport={{ once: true, amount: .8 }}
                >
                    <div className="hiw-step">
                        2
                    </div>
                    <h3 className="mb-2">Generate Cards</h3>
                    <img
                        src={step2}
                        className="hiw-card-img"
                        onClick={() => handleSelectImage(step2)}
                    />
                    <p className="text-gray-300 mb-6">
                        Select flashcards, quizzes, or reviewers based on your study needs
                    </p>
                </motion.div>
                <motion.div
                    className="hiw-card"
                    initial={popup.hidden}
                    whileInView={popup.show}
                    viewport={{ once: true, amount: .8 }}
                >
                    <div className="hiw-step">
                        3
                    </div>
                    <h3 className="mb-2">Study & Master</h3>
                    <img
                        src={step3}
                        className="hiw-card-img"
                        onClick={() => handleSelectImage(step3)}
                    />
                    <p className="text-gray-300 mb-6">
                        Practice, test yourself, and master the material at your own pace
                    </p>
                </motion.div>
            </div>
            {showImage &&
                <div
                    className="fixed inset-0 flex-center bg-black/25 p-8 z-999"
                    onClick={() => setShowImage(false)}
                >
                    <motion.img
                        src={image}
                        className="max-h-full rounded-xl"
                        initial={popup.hidden}
                        whileInView={popup.show}
                        viewport={{ once: true, amount: .8 }}
                    />
                </div>
            }
        </section>
    );
}
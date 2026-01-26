/* eslint-disable no-unused-vars */
import { FileText, GraduationCap, Layers } from "lucide-react";
import Topbar from "../components/Topbar";
import GenerateMaterial from "../components/GenerateMaterial";
import { useState } from "react";
import { useEffect } from "react";
import { fetchAllDeck } from "../services/deckServices";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import AddDeck from "../components/AddDeck";
import flashcard_img from '../assets/flashcard.png'
import quiz_img from '../assets/quiz.png'
import reviewer_img from '../assets/reviewer.png'
import { countDeckQuizReviewer } from "../services/statsServices";

export default function Home() {

    const [materialsTotal, setMaterialsTotal] = useState({ deck: 0, quiz: 0, reviewer: 0 });

    const loadTotals = async () => {
        try {
            const { success, message, totals } = await countDeckQuizReviewer();
            if (success) return setMaterialsTotal(totals);
            toast.error(message);
        } catch (error) {
            console.error('Error on loadTotals:', error)
        }
    }

    useEffect(() => {
        queueMicrotask(() => {
            loadTotals();
        });
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Topbar />
            <div className="grow mx-[10vw] py-4">

                <section className="mb-16">
                    <GenerateMaterial runFunction={loadTotals} />
                </section>

                <section className="mb-12">
                    <p className="text-center mb-8 font-semibold text-lg">Study Materials</p>
                    <div className="grid lg:grid-cols-3 gap-4">
                        <Link to={'/app/decks'} className="group relative border flex flex-col flex-center gap-4 p-8 cursor-pointer rounded-lg bg-blue-600 text-white hover:saturate-50 duration-150 overflow-hidden">
                            <p className="text-3xl font-bold z-10">{materialsTotal?.deck >= 100 ? '99+' : materialsTotal?.deck}</p>
                            <div className="flex items-center gap-2 z-10">
                                <Layers />
                                <p className="font-semibold text-xl">Deck</p>
                            </div>
                            <img
                                src={flashcard_img}
                                className="absolute right-0 h-64 w-64 img-fade-left group-hover:scale-105 duration-150 "
                            />
                        </Link>
                        <Link to={'/app/quizzes'} className="group relative border flex flex-col flex-center gap-4 p-8 cursor-pointer rounded-lg bg-green-600 text-white hover:saturate-50 duration-150 overflow-hidden">
                            <p className="text-3xl font-bold z-10">{materialsTotal?.quiz >= 100 ? '99+' : materialsTotal?.quiz}</p>
                            <div className="flex items-center gap-2 z-10">
                                <GraduationCap />
                                <p className="font-semibold text-xl">Quiz</p>
                            </div>
                            <img
                                src={quiz_img}
                                className="absolute right-0 h-64 w-64 img-fade-left group-hover:scale-105 duration-150"
                            />
                        </Link>
                        <Link to={'/app/reviewers'} className="group relative border flex flex-col flex-center gap-4 p-8 cursor-pointer rounded-lg bg-purple-600 text-white hover:saturate-50 duration-150 overflow-hidden">
                            <p className="text-3xl font-bold z-10">{materialsTotal?.reviewer >= 100 ? '99+' : materialsTotal?.reviewer}</p>
                            <div className="flex items-center gap-2 z-10">
                                <FileText />
                                <p className="font-semibold text-xl">Reviewer</p>
                            </div>
                            <img
                                src={reviewer_img}
                                className="absolute right-0 h-64 w-64 img-fade-left group-hover:scale-105 duration-150"
                            />
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    )
};
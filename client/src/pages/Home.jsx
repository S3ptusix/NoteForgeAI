/* eslint-disable no-unused-vars */
import { FileText, GraduationCap, Layers, Plus } from "lucide-react";
import Topbar from "../components/Topbar";
import GenerateMaterial from "../components/GenerateMaterial";
import Decks from "../components/Decks";
import { useState } from "react";
import { useEffect } from "react";
import { fetchAllDeck } from "../services/deckServices";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import AddDeck from "../components/AddDeck";

export default function Home() {

    const [openAddDeck, setOpenAddDeck] = useState(false);
    const [data, setData] = useState([]);

    const loadAllDeck = async () => {
        try {
            const { success, message, decks } = await fetchAllDeck();
            if (success) return setData(decks);
            toast.error(message);
        } catch (error) {
            console.error('Error on loadAllDeck:', error)
        }
    }

    useEffect(() => {
        queueMicrotask(() => {
            loadAllDeck();
        });
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Topbar />
            <div className="grow mx-[10vw] py-4">

                <section className="mb-16">
                    <GenerateMaterial runFunction={loadAllDeck} />
                </section>

                <section className="">
                    <p className="text-center mb-8 font-semibold text-lg">Study Materials</p>
                    <div className="grid lg:grid-cols-3 gap-4">
                        <Link to={'/app/decks'} className="border p-8 flex-center flex-col gap-2 cursor-pointer rounded-lg bg-blue-600 text-white hover:saturate-50 duration-150">
                            <Layers />
                            <p>Decks</p>
                        </Link>
                        <Link to={'/app/quizzes'} className="border p-8 flex-center flex-col gap-2 cursor-pointer rounded-lg bg-green-600 text-white hover:saturate-50 duration-150">
                            <GraduationCap />
                            <p className="font-semibold">Quizzes</p>
                        </Link>
                        <Link to={'/app/reviewers'} className="border p-8 flex-center flex-col gap-2 cursor-pointer rounded-lg bg-purple-600 text-white hover:saturate-50 duration-150">
                            <FileText />
                            <p className="font-semibold">Reviewers</p>
                        </Link>
                    </div>
                </section>
            </div>

            {openAddDeck &&
                <AddDeck
                    onClose={() => setOpenAddDeck(false)}
                    loadAllDeck={loadAllDeck}
                />
            }
        </div>
    )
};
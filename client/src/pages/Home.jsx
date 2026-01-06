import { Plus } from "lucide-react";
import Topbar from "../components/Topbar";
import GenerateFlashcards from "../components/GenerateFlashcards";
import AddDeck from "../components/addDeck";
import { useState } from "react";
import Decks from "../components/Decks";
import { useEffect } from "react";
import { fetchAllDeck } from "../services/deckServices";
import { toast } from "react-toastify";

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

                <GenerateFlashcards />

                <div>
                    <div className="flex items-center justify-between mb-4">
                        <p className="font-semibold">My Decks</p>

                        <button
                            className="btn bg-blue-600 text-white"
                            onClick={() => setOpenAddDeck(true)}
                        >
                            <Plus size={16} />
                            New Deck
                        </button>
                    </div>

                    <Decks
                        decks={data}
                        loadAllDeck={loadAllDeck}
                    />
                </div>
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
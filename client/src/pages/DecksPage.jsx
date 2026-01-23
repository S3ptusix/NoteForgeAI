import { Link } from "react-router-dom";
import Topbar from "../components/Topbar";
import { ArrowLeft, Plus } from "lucide-react";
import { useState } from "react";
import { fetchAllDeck } from "../services/deckServices";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Decks from "../components/Decks";
import AddDeck from "../components/AddDeck";
import Loading from "../components/Loading";

export default function DecksPage() {

    const [openAddDeck, setOpenAddDeck] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadAllDeck = async () => {
        try {
            setLoading(true);
            const { success, message, decks } = await fetchAllDeck();
            if (success) return setData(decks);
            toast.error(message);
        } catch (error) {
            console.error('Error on loadAllDeck:', error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        queueMicrotask(() => {
            loadAllDeck();
        });
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="min-h-screen flex flex-col">
            <Topbar />
            <div className="grow mx-[10vw] py-8">
                <Link to={'/app'}
                    className="flex items-center cursor-pointer gap-2 text-gray-700"
                >
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>
                <section className="my-4">
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
}
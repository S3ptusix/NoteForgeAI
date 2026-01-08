/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import Topbar from "../components/Topbar";
import { ArrowLeft, GraduationCap, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import AddCard from "../components/AddCard";
import { fetchAllCard } from "../services/cardServices";
import { toast } from "react-toastify";
import Cards from "../components/Cards";

export default function ViewCards() {

    const navigate = useNavigate();

    const { deckId } = useParams();
    const [openAddCard, setOpenAddCard] = useState(false);

    const [data, setData] = useState([]);
    const [name, setName] = useState('');

    const loadAllCard = async () => {
        try {
            const { success, message, deckName, cards } = await fetchAllCard(deckId);
            if (success) {
                setName(deckName);
                setData(cards);
                return
            };
            toast.error(message);
        } catch (error) {
            console.error('Error on loadAllCard:', error)
        }
    }

    useEffect(() => {
        queueMicrotask(() => {
            loadAllCard();
        });
    }, [deckId]);

    return (
        <div className="min-h-screen flex flex-col">
            <Topbar />
            <div className="grow mx-[10vw] py-8">
                <button
                    className="flex items-center cursor-pointer gap-2 text-gray-700"
                    onClick={() => navigate('/app')}
                >
                    <ArrowLeft size={16} />
                    Back to Decks
                </button>
                <div className="flex flex-wrap gap-x-20 gap-y-4 items-center justify-between my-4">
                    <p className="font-semibold text-lg">{name}</p>
                    <div className="flex flex-wrap gap-4">
                        <button
                            className="btn bg-green-600 text-white"
                            onClick={() => navigate(`/app/studyMode/${deckId}`)}
                        >
                            <GraduationCap size={16} />
                            Study Mode
                        </button>
                        <button
                            className="btn bg-blue-600 text-white"
                            onClick={() => setOpenAddCard(true)}
                        >
                            <Plus size={16} />
                            Add Card
                        </button>
                    </div>
                </div>

                <Cards
                    cards={data}
                    loadAllCard={loadAllCard}
                />

            </div>
            {openAddCard &&
                <AddCard
                    deckId={deckId}
                    onClose={() => setOpenAddCard(false)}
                    runFunction={loadAllCard}
                />
            }
        </div>
    )
}
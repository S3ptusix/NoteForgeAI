import { Plus, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";
import AddCard from "./AddCard";
import DeleteDeck from "./DeleteDeck";
import { useNavigate } from "react-router-dom";

export default function Decks({ decks, loadAllDeck }) {

    const navigate = useNavigate();

    const [openAddDeck, setOpenAddDeck] = useState(false);
    const [openDeleteDeck, setOpenDeleteDeck] = useState(false);
    const [deckId, setDeckId] = useState(null);

    const handleAdd = (deckId) => {
        setDeckId(deckId);
        setOpenAddDeck(true);
    }

    const handleDelete = (deckId) => {
        setDeckId(deckId);
        setOpenDeleteDeck(true);
    }

    if (!decks.length) {
        return (
            <p className="text-gray-400 text-center my-16">
                No decks yet. Create your first deck to get started!
            </p>
        );
    }

    return (
        <div className="grid grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1 gap-4">
            {decks.map((deck) => (
                <div key={deck.id} className="border border-gray-300 p-4 rounded-lg">

                    <div className="flex items-center justify-between mb-4">
                        <p className="font-semibold">{deck.deckName}</p>
                        <div className="flex gap-4">
                            <button
                                className="cursor-pointer text-blue-600"
                            >
                                <SquarePen size={16} />
                            </button>
                            <button
                                className="cursor-pointer text-red-500"
                                onClick={() => handleDelete(deck.id)}
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>


                    <p className="mb-4 text-gray-400">
                        {deck.cards.length} {deck.cards.length === 1 ? "card" : "cards"}
                    </p>


                    <div className="flex gap-4">
                        <button
                            className="btn grow bg-blue-600 text-white"
                            onClick={() => navigate(`/viewCards/${deck.id}`)}
                        >
                            View Cards
                        </button>
                        <button
                            className="btn btn-square border-gray-300"
                            onClick={() => handleAdd(deck.id)}
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                </div>
            ))}

            {openAddDeck &&
                <AddCard
                    deckId={deckId}
                    onClose={() => setOpenAddDeck(false)}
                    runFunction={loadAllDeck}
                />
            }
            {openDeleteDeck &&
                <DeleteDeck
                    deckId={deckId}
                    onClose={() => setOpenDeleteDeck(false)}
                    loadAllDeck={loadAllDeck}
                />
            }
        </div>
    );
}

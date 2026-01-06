import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import AddCard from "./AddCard";
import DeleteDeck from "./DeleteDeck";

export default function Decks({ decks, loadAllDeck }) {

    const [openAddCard, setOpenAddCard] = useState(false);
    const [openDeleteCard, setOpenDeleteCard] = useState(false);
    const [deckId, setDeckId] = useState(null);

    const handleAdd = (deckId) => {
        setDeckId(deckId);
        setOpenAddCard(true);
    }

    const handleDelete = (deckId) => {
        setDeckId(deckId);
        setOpenDeleteCard(true);
    }

    return (
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
            {decks.map((deck) => (
                <div key={deck.id} className="border border-gray-300 p-4 rounded-lg">

                    <div className="flex items-center justify-between mb-4">
                        <p className="font-semibold">{deck.deckName}</p>
                        <button
                            className="btn btn-square btn-ghost text-red-500"
                            onClick={() => handleDelete(deck.id)}
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>


                    <p className="mb-4 text-gray-400">
                        {deck.cards.length} {deck.cards.length === 1 ? "card" : "cards"}
                    </p>


                    <div className="flex gap-4">
                        <button className="btn grow bg-blue-600 text-white">
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

            {openAddCard &&
                <AddCard
                    deckId={deckId}
                    onClose={() => setOpenAddCard(false)}
                    loadAllDeck={loadAllDeck}
                />
            }
            {openDeleteCard &&
                <DeleteDeck
                    deckId={deckId}
                    onClose={() => setOpenDeleteCard(false)}
                    loadAllDeck={loadAllDeck}
                />
            }
        </div>
    );
}

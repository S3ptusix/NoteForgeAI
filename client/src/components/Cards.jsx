import { SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteCard from "./DeleteCard";
import EditCard from "./EditCard";

export default function Cards({ cards = [], loadAllCard = () => { } }) {

    const [flipped, setFlipped] = useState({});

    const [cardId, setCardId] = useState(null);
    const [openDeleteCard, setOpenDeleteCard] = useState(false);
    const [openEditCard, setOpenEditCard] = useState(false);

    const toggleFlip = (id) => {
        setFlipped(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleDelete = (cardId) => {
        setCardId(cardId);
        setOpenDeleteCard(true);
    }

    const handleEdit = (cardId) => {
        setCardId(cardId);
        setOpenEditCard(true);
    }

    if (!cards.length) {
        return (
            <p className="text-gray-400 text-center my-16">
                No cards in this deck yet. Add your first card!
            </p>
        );
    }

    return (
        <div className="grid grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1 gap-4">

            {cards.map(card => {

                const isFlipped = flipped[card.id];

                return (

                    <div
                        key={card.id}
                        className="border border-gray-300 rounded-lg p-8 text-sm"
                    >
                        <div className="flex justify-end gap-4">
                            <button
                                className="text-blue-600 cursor-pointer"
                                onClick={() => handleEdit(card.id)}
                            >
                                <SquarePen size={16} />
                            </button>

                            <button
                                className="text-red-600 cursor-pointer"
                                onClick={() => handleDelete(card.id)}
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div
                            className="flex-center my-4 py-16 cursor-pointer"
                            onClick={() => toggleFlip(card.id)}
                        >
                            {!isFlipped ?
                                <div className="text-center">
                                    <p className="text-gray-400 mb-2">QUESTION</p>
                                    <p>{card.question}</p>
                                </div> :
                                <div className="text-center">
                                    <p className="text-gray-400 mb-2">ANSWER</p>
                                    <p>{card.answer}</p>
                                </div>
                            }


                        </div>

                        <p className="text-center text-gray-400">
                            Click to flip
                        </p>
                    </div>
                )
            })}
            {openDeleteCard &&
                <DeleteCard
                    cardId={cardId}
                    onClose={() => setOpenDeleteCard(false)}
                    runFunction={loadAllCard}
                />
            }

            {openEditCard &&
                <EditCard
                    cardId={cardId}
                    onClose={() => setOpenEditCard(false)}
                    runFunction={loadAllCard}
                />
            }
        </div>
    );
}

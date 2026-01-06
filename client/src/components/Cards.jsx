/* eslint-disable no-unused-vars */
import { SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";

export default function Cards({ data = [] }) {

    const [flipped, setFlipped] = useState({});

    const toggleFlip = (id) => {
        setFlipped(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    if (!data.length) {
        return (
            <p className="text-gray-400 text-center my-16">
                No cards in this deck yet. Add your first card!
            </p>
        );
    }

    return (
        <div className="grid grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1 gap-4">

            {data.map(card => {

                const isFlipped = flipped[card.id];

                return (

                    <div
                        key={card.id}
                        className="border border-gray-300 rounded-lg p-8 text-sm"
                    >
                        <div className="flex justify-end gap-4">
                            <button className="text-blue-600 cursor-pointer">
                                <SquarePen size={16} />
                            </button>

                            <button className="text-red-600 cursor-pointer">
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div
                            className="flex-center my-4 py-16 cursor-pointer"
                            onClick={() => toggleFlip(card.id)}
                        >
                            {isFlipped ?
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

        </div>
    );
}

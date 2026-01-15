/* eslint-disable no-unused-vars */
import { CirclePlay, Pen, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Quizzes({ quizzes, loadAllQuiz }) {

    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1 gap-4">
            {quizzes.map((quiz) => (
                <div key={quiz.id} className="border border-gray-300 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                        <p className="font-semibold">{quiz.quizName}</p>
                    </div>

                    <p className="mb-4 text-gray-400">
                        {quiz.questionCount} {quiz.questionCount === 1 ? "question" : "questions"}
                    </p>

                    <div className="flex gap-2">
                        <button
                            className="btn grow bg-green-600 text-white"
                        >
                            <CirclePlay size={16} />
                            Take Quiz
                        </button>
                        <button
                            className="btn btn-square bg-blue-600 text-white"
                        >
                            <Pen size={16} />
                        </button>
                        <button
                            className="btn btn-square bg-red-600 text-white"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            ))}

            {/* {openAddDeck &&
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

            {openEditDeck &&
                <EditDeck
                    deckId={deckId}
                    onClose={() => setOpenEditDeck(false)}
                    runFunction={loadAllDeck}
                />
            } */}
        </div>
    );
}
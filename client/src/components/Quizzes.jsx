import { CirclePlay, Pen, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteQuiz from "./DeleteQuiz";
import EditQuiz from "./editQuiz";

export default function Quizzes({ quizzes, loadAllQuiz }) {

    const navigate = useNavigate();

    const [quizId, setQuizId] = useState(null);
    const [openDeleteQuiz, setOpenDeleteQuiz] = useState(false);
    const [openEditQuiz, setOpenEditQuiz] = useState(false);

    const handleDelete = (quizId) => {
        setQuizId(quizId);
        setOpenDeleteQuiz(true);
    }

    const handleEdit = (deckId) => {
        setQuizId(deckId);
        setOpenEditQuiz(true);
    }

    return (
        <div className="grid grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1 gap-4">
            {quizzes.map((quiz) => (
                <div key={quiz.id} className="border border-gray-300 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                        <p className="font-semibold">{quiz.quizName}</p>
                    </div>

                    <p className="mb-4 text-gray-400">
                        {quiz.questions.length} {quiz.questions.length === 1 ? "question" : "questions"}
                    </p>

                    <div className="flex gap-2">
                        <button
                            className="btn grow bg-green-600 text-white"
                            onClick={() => navigate(`/app/takeQuiz/${quiz.id}`)}
                        >
                            <CirclePlay size={16} />
                            Take Quiz
                        </button>
                        <button
                            className="btn btn-square bg-blue-600 text-white"
                            onClick={() => handleEdit(quiz.id)}
                        >
                            <Pen size={16} />
                        </button>
                        <button
                            className="btn btn-square bg-red-600 text-white"
                            onClick={() => handleDelete(quiz.id)}
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            ))}

            {openDeleteQuiz &&
                <DeleteQuiz
                    quizId={quizId}
                    onClose={() => setOpenDeleteQuiz(false)}
                    loadAllQuiz={loadAllQuiz}
                />
            }

            {openEditQuiz &&
                <EditQuiz
                    quizId={quizId}
                    onClose={() => setOpenEditQuiz(false)}
                    loadAllQuiz={loadAllQuiz}
                />
            }
        </div>
    );
}
import { Link } from "react-router-dom";
import Topbar from "../components/Topbar";
import { ArrowLeft, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import AddQuiz from "../components/AddQuiz";
import Quizzes from "../components/Quizzes";
import { fetchAllQuiz } from "../services/quizServices.";
import { toast } from "react-toastify";

export default function QuizzesPage() {

    const [openAddQuiz, setOpenAddQuiz] = useState(false);
    const [data, setData] = useState([]);

    const loadAllQuiz = async () => {
        try {
            const { success, message, quizzes } = await fetchAllQuiz();
            if (success) return setData(quizzes);
            toast.error(message);
        } catch (error) {
            console.error('Error on loadAllDeck:', error)
        }
    }

    useEffect(() => {
        queueMicrotask(() => {
            loadAllQuiz();
        });
    }, []);

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
                        <p className="font-semibold">My Quizzes</p>

                        <button
                            className="btn bg-green-600 text-white"
                            onClick={() => setOpenAddQuiz(true)}
                        >
                            <Plus size={16} />
                            New Quiz
                        </button>
                    </div>

                    <Quizzes
                    quizzes={data}
                    loadAllQuiz={loadAllQuiz}
                    />
                </section>
            </div>
            {openAddQuiz &&
                <AddQuiz
                    onClose={() => setOpenAddQuiz(false)}
                    loadAllQuiz={loadAllQuiz}
                />
            }
        </div>
    )
}
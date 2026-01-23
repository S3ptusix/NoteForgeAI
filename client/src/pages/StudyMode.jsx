/* eslint-disable react-hooks/exhaustive-deps */
import { ChevronLeft, ChevronRight, RotateCcw, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllCard } from "../services/cardServices";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

export default function StudyMode() {

    const { deckId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState([]);
    const [name, setName] = useState('');

    const [page, setPage] = useState(0);

    const [flipped, setFlipped] = useState(false);

    const handlePrevious = () => {
        if (page > 0) {
            setPage(prev => prev - 1);
        }
    }

    const handleNext = () => {
        if (page < data.length - 1) {
            setPage(prev => prev + 1);
        }
    }

    useEffect(() => {
        const loadAllCard = async () => {
            try {
                setLoading(true);
                const { success, message, deckName, cards } = await fetchAllCard(deckId);
                if (success) {
                    setName(deckName);
                    setData(cards);
                    return
                };
                toast.error(message);
            } catch (error) {
                console.error('Error on loadAllCard:', error)
            } finally {
                setLoading(false);
            }
        }
        loadAllCard();
    }, [deckId])

    useEffect(() => {
        queueMicrotask(() => {
            setFlipped(false);
        })
    }, [page]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === "Space") {
                e.preventDefault();
                setFlipped(prev => !prev)
            } else if (e.code === "ArrowRight") {
                handleNext();
            } else if (e.code === "ArrowLeft") {
                handlePrevious();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [page, data.length]);

    if (loading) return <Loading />;

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex items-center justify-between py-4 px-[10vw]">
                <div>
                    <p className="font-semibold">{name}</p>
                    <p className="text-sm text-gray-700">Card {page + 1} of {data.length}</p>
                </div>

                <button
                    className="flex gap-2 items-center text-gray-700 cursor-pointer font-semibold"
                    onClick={() => navigate(`/app/viewCards/${deckId}`)}
                >
                    <X />
                    Exit
                </button>
            </div>
            <div className="border border-gray-300 h-2 px-[10vw]">
                <div className="bg-gray-300 h-full w-full">
                    <div
                        className="bg-blue-600 h-full duration-200"
                        style={{ width: `${((page + 1) / data.length) * 100}%` }}
                    >
                    </div>
                </div>
            </div>
            <div>

            </div>
            <div className="flex-center grow my-4 mx-[10vw]">
                <div
                    className="flex-center border border-gray-200 shadow-md p-8 rounded-lg min-h-80 w-full lg:w-[80%] cursor-pointer"
                    onClick={() => setFlipped(prev => !prev)}
                >
                    <div className="text-center">
                        {!flipped ? (
                            <>
                                <p className="text-sm text-gray-700">QUESTION</p>
                                <p className="font-semibold my-4 text-xl">
                                    {data[page]?.question}
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="text-sm text-gray=700">ANSWER</p>
                                <p className="font-semibold my-4 text-xl text-green-600">
                                    {data[page]?.answer}
                                </p>
                            </>
                        )}
                        <p className="text-sm text-gray-400">Click card or press Space to flip</p>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-300 px-[10vw] py-8">
                <div className="flex justify-between mb-4">
                    <button
                        className="btn max-sm:btn-square bg-white border-gray-300 sm:min-w-25"
                        onClick={handlePrevious}
                    >
                        <ChevronLeft size={16} />
                        <p className="max-sm:hidden">Previous</p>
                    </button>
                    <button
                        className="btn max-sm:btn-square bg-white border-gray-300 sm:min-w-25"
                        onClick={() => setPage(0)}
                    >
                        <RotateCcw size={16} />
                        <p className="max-sm:hidden">Restart</p>
                    </button>
                    <button
                        className="btn max-sm:btn-square bg-blue-600 text-white sm:min-w-25"
                        onClick={handleNext}
                    >
                        <p className="max-sm:hidden">Next</p>
                        <ChevronRight size={16} />
                    </button>
                </div>
                <p className="text-center text-sm text-gray-400">Use arrow keys to navigate • Space to flip</p>
            </div>
        </div>
    )
}
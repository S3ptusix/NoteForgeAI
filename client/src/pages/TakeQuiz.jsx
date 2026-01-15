/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { fetchOneQuiz } from "../services/quizServices.";
import { toast } from "react-toastify";

export default function TakeQuiz() {

    const navigate = useNavigate();

    const { quizId } = useParams();

    const [quiz, setQuiz] = useState(null);

    const [number, setNumber] = useState(1);

    const [score, setScore] = useState(0);

    const [selectedAnswer, setSelectedAnswer] = useState('');

    const [showAnswer, setShowAnswer] = useState(false);
    const [correctAnswer, setCorrentAnswer] = useState('');

    const [showScore, setShowScore] = useState(false);


    const handleSubmitAnswer = () => {
        if (selectedAnswer === quiz.questions[number - 1].answer) setScore(prev => prev + 1);
        setCorrentAnswer(quiz.questions[number - 1].answer);
        setShowAnswer(true);
    }

    const handleNextQuestion = () => {
        if (number < quiz.questions.length) {
            setNumber(prev => prev + 1);
            setSelectedAnswer('');
            setCorrentAnswer('');
            setShowAnswer(false);
            return
        }
        setShowScore(true);
    }

    useEffect(() => {
        try {
            const loadQuiz = async () => {
                const { success, message, quiz } = await fetchOneQuiz(quizId);
                if (success) return setQuiz(quiz);
                return toast.error(message);
            }
            loadQuiz();
        } catch (error) {
            console.error('Error on loadQuiz:', error);
        }
    }, [])

    if (showScore) {
        return (
            <div className="flex flex-col items-center min-h-screen px-[10vw]">
                <div className="w-full lg:w-[80%] my-8">
                    <button
                        className="flex gap-2 items-center text-gray-700 cursor-pointer font-semibold"
                        onClick={() => navigate(`/app/quizzes`)}
                    >
                        <ArrowLeft />
                        Exit Quiz
                    </button>
                </div>

                <div className="flex flex-col items-center border border-gray-200 bg-white shadow-md p-8 w-full lg:w-[80%] rounded-lg">
                    <p className="text-xl font-semibold mb-4">Quiz Complete!</p>
                    <p className="text-xl text-ggray-400 mb-4">Your Scored {score} of {quiz.questions.length}</p>
                    <p className="text-3xl font-bold text-blue-600 mb-4">{(score / quiz.questions.length * 100).toFixed(2)}%</p>
                    <div className="flex gap-4">
                        <button
                            className="btn p-6 rounded-lg bg-blue-600 text-white"
                            onClick={() => location.reload()}
                        >
                            Retry Quiz
                        </button>
                        <button
                            className="btn p-6 rounded-lg bg-gray-700 text-white"
                            onClick={() => navigate('/app/quizzes')}
                        >
                            Exit
                        </button>
                    </div>
                </div>

            </div>
        )
    }

    return (
        <div className="flex flex-col items-center min-h-screen px-[10vw]">
            <div className="w-full lg:w-[80%] my-8">
                <button
                    className="flex gap-2 items-center text-gray-700 cursor-pointer font-semibold"
                    onClick={() => navigate(`/app/quizzes`)}
                >
                    <ArrowLeft />
                    Exit Quiz
                </button>
            </div>
            {quiz &&
                <div className="border border-gray-200 bg-white shadow-md p-8 w-full lg:w-[80%] rounded-lg">
                    <p className="text-lg font-semibold mb-4">{quiz.quizName}</p>
                    <div className="flex justify-between mb-2">
                        <p className="text-sm text-gray-700">Question {number} of {quiz.questions.length}</p>
                        <p className="text-sm text-gray-700">Score: {score}/{quiz.questions.length}</p>
                    </div>
                    <div className="bg-gray-300 h-2 w-full rounded-full overflow-hidden">
                        <div
                            className="bg-blue-600 h-full duration-200 w-1/2 rounded-full"
                            style={{ width: `${(number / quiz.questions.length) * 100}%` }}
                        >
                        </div>
                    </div>
                    <p className="text-lg font-semibold my-4">{quiz.questions[number - 1].question}</p>
                    <button
                        className={`flex justify-between items-center w-full text-left p-4 border-2 rounded-lg font-semibold text-sm mb-4 cursor-pointer 
                            hover:bg-blue-600/10 hover:border-blue-600/50 duration-150 
                            ${!showAnswer && selectedAnswer === 'A' ? 'bg-blue-600/20 border-blue-600' : 'border-gray-300'}
                            ${showAnswer && selectedAnswer === 'A' ? correctAnswer === 'A' ? 'bg-green-600/20 border-green-600' : 'bg-red-600/20 border-red-600' : correctAnswer === 'A' ? 'bg-green-600/20 border-green-600' : ''}
                            `}
                        onClick={() => setSelectedAnswer('A')}
                    >
                        <span>A. {quiz.questions[number - 1].optionA}</span>
                        {showAnswer && selectedAnswer === 'A' ? correctAnswer === 'A' ? <CheckCircle size={16} className=" text-green-600" /> : <XCircle size={16} className=" text-red-600" /> : correctAnswer === 'A' ? <CheckCircle size={16} className=" text-green-600" /> : ''}
                    </button>
                    <button
                        className={`flex justify-between items-center w-full text-left p-4 border-2 rounded-lg font-semibold text-sm mb-4 cursor-pointer 
                            hover:bg-blue-600/10 hover:border-blue-600/50 duration-150 
                            ${!showAnswer && selectedAnswer === 'B' ? 'bg-blue-600/20 border-blue-600' : 'border-gray-300'}
                            ${showAnswer && selectedAnswer === 'B' ? correctAnswer === 'B' ? 'bg-green-600/20 border-green-600' : 'bg-red-600/20 border-red-600' : correctAnswer === 'B' ? 'bg-green-600/20 border-green-600' : ''}
                            `}
                        onClick={() => setSelectedAnswer('B')}
                    >
                        <span>B. {quiz.questions[number - 1].optionB}</span>
                        {showAnswer && selectedAnswer === 'B' ? correctAnswer === 'B' ? <CheckCircle size={16} className=" text-green-600" /> : <XCircle size={16} className=" text-red-600" /> : correctAnswer === 'B' ? <CheckCircle size={16} className=" text-green-600" /> : ''}
                    </button>
                    <button
                        className={`flex justify-between items-center w-full text-left p-4 border-2 rounded-lg font-semibold text-sm mb-4 cursor-pointer 
                            hover:bg-blue-600/10 hover:border-blue-600/50 duration-150 
                            ${!showAnswer && selectedAnswer === 'C' ? 'bg-blue-600/20 border-blue-600' : 'border-gray-300'}
                            ${showAnswer && selectedAnswer === 'C' ? correctAnswer === 'C' ? 'bg-green-600/20 border-green-600' : 'bg-red-600/20 border-red-600' : correctAnswer === 'C' ? 'bg-green-600/20 border-green-600' : ''}
                            `}
                        onClick={() => setSelectedAnswer('C')}
                    >
                        <span>C. {quiz.questions[number - 1].optionC}</span>
                        {showAnswer && selectedAnswer === 'C' ? correctAnswer === 'C' ? <CheckCircle size={16} className=" text-green-600" /> : <XCircle size={16} className=" text-red-600" /> : correctAnswer === 'C' ? <CheckCircle size={16} className=" text-green-600" /> : ''}
                    </button>
                    <button
                        className={`flex justify-between items-center w-full text-left p-4 border-2 rounded-lg font-semibold text-sm mb-4 cursor-pointer 
                            hover:bg-blue-600/10 hover:border-blue-600/50 duration-150 
                            ${!showAnswer && selectedAnswer === 'D' ? 'bg-blue-600/20 border-blue-600' : 'border-gray-300'}
                            ${showAnswer && selectedAnswer === 'D' ? correctAnswer === 'D' ? 'bg-green-600/20 border-green-600' : 'bg-red-600/20 border-red-600' : correctAnswer === 'D' ? 'bg-green-600/20 border-green-600' : ''}
                            `}
                        onClick={() => setSelectedAnswer('D')}
                    >
                        <span>D. {quiz.questions[number - 1].optionD}</span>
                        {showAnswer && selectedAnswer === 'D' ? correctAnswer === 'D' ? <CheckCircle size={16} className=" text-green-600" /> : <XCircle size={16} className=" text-red-600" /> : correctAnswer === 'D' ? <CheckCircle size={16} className=" text-green-600" /> : ''}
                    </button>
                    <div className="flex justify-end">
                        {showAnswer ?
                            <button
                                className="btn bg-blue-600 text-white rounded-lg cursor-default"
                                onClick={handleNextQuestion}
                            >
                                Next Question
                            </button> :
                            <button
                                disabled={selectedAnswer === ''}
                                className="btn bg-blue-600 text-white rounded-lg cursor-default disabled:bg-gray-200 disabled:text-gray-400"
                                onClick={handleSubmitAnswer}
                            >
                                Submit Answer
                            </button>
                        }
                    </div>
                </div>
            }
        </div>
    )
}
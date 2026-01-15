/* eslint-disable react-hooks/exhaustive-deps */
import { Plus, X } from "lucide-react";
import Question from "./Question";
import { useEffect, useState } from "react";
import { editQuiz, fetchOneQuiz } from "../services/quizServices.";
import { toast } from 'react-toastify';

export default function EditQuiz({ quizId, onClose, loadAllQuiz }) {

    const [quizName, setQuizName] = useState('');
    const [questions, setQuestions] = useState([
        {
            question: '',
            optionA: '',
            optionB: '',
            optionC: '',
            optionD: '',
            answer: 'A',
        }
    ]);

    const addQuestion = () => {
        setQuestions(prev =>
            [
                ...prev,
                {
                    question: '',
                    optionA: '',
                    optionB: '',
                    optionC: '',
                    optionD: '',
                    answer: 'A',
                }
            ]
        )
    }

    const handleSubmit = async () => {
        try {
            const { success, message } = await editQuiz({ quizId, quizName, questions });
            if (success) {
                loadAllQuiz();
                onClose();
                return toast.success(message);;
            }
            return toast.error(message);
        } catch (error) {
            console.log('Error on handleSubmit:', error);
        }
    }

    useEffect(() => {
        try {
            const loadQuiz = async () => {
                const { success, message, quiz } = await fetchOneQuiz(quizId);
                if (success) {
                    setQuizName(quiz.quizName);
                    setQuestions(quiz.questions);
                    return
                }
                toast.error(message);
            }
            loadQuiz();
        } catch (error) {
            console.error('Error on loadQuiz:', error);
        }
    }, []);

    return (
        <div className="modal-style">
            <div>
                <div className="modal-title">
                    <p className="font-semibold">Edit Quiz</p>
                    <button
                        className="btn btn-square btn-ghost"
                        onClick={onClose}
                    >
                        <X />
                    </button>
                </div>
                <p className="font-semibold mb-1 text-gray-700 text-sm">Quiz Name</p>
                <input
                    type="text"
                    placeholder="Enter quiz name"
                    className="input w-full mb-4"
                    value={quizName}
                    onChange={(e) => setQuizName(e.target.value)}
                />

                {questions.map((question, index) => (
                    <Question
                        key={index}
                        index={index}
                        question={question}
                        totalQuestions={questions.length}
                        setQuestions={setQuestions}

                    />
                ))}

                <button
                    className="btn w-full mb-4"
                    onClick={addQuestion}
                >
                    <Plus strokeWidth={1} size={16} /> Add Question
                </button>

                <div className="flex gap-4">
                    <button
                        className="grow btn bg-blue-600 text-white"
                        onClick={handleSubmit}
                    >
                        Update Quiz
                    </button>
                    <button
                        className="btn border-gray-300"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}
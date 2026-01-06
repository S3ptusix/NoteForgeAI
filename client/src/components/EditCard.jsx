import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { editCard, fetchOneCard } from "../services/cardServices";
import { fixSpaces } from "../utils/format";

export default function EditCard({ cardId, onClose, runFunction = () => { } }) {

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleSubmit = async () => {
        try {
            const formatedQuestion = fixSpaces(question);
            const formatedAnswer = fixSpaces(answer);
            const { success, message } = await editCard({ cardId, question: formatedQuestion, answer: formatedAnswer });
            if (success) {
                runFunction();
                onClose();
                return toast.success(message);
            };
            return toast.error(message);
        } catch (error) {
            console.error('Error on handSubmit:', error);
        }
    }

    useEffect(() => {
        const loadValues = async () => {
            try {
                const { success, message, card } = await fetchOneCard(cardId);
                if (success) {
                    setQuestion(card.question);
                    setAnswer(card.answer);
                };
                return toast.error(message, { toastId: "error-loadCard" });
            } catch (error) {
                console.log('Error on loadValues:', error);
            }
        }
        loadValues();
    }, [cardId]);

    return (
        <div className="modal-style">
            <div>
                <div className="modal-title">
                    <p className="font-semibold">Edit Card</p>
                    <button
                        className="btn btn-square btn-ghost"
                        onClick={onClose}
                    >
                        <X />
                    </button>
                </div>

                <p className="font-semibold mb-1 text-gray-700 text-sm">Question</p>
                <textarea
                    placeholder="Enter the question..."
                    className="border border-gray-300 w-full p-4 rounded-md h-25 mb-4 resize-none focus:outline-blue-700"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />

                <p className="font-semibold mb-1 text-gray-700 text-sm">Answer</p>
                <textarea
                    placeholder="Enter the answer..."
                    className="border border-gray-300 w-full p-4 rounded-md h-25 mb-4 resize-none focus:outline-blue-700"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />

                <div className="flex gap-4">
                    <button
                        className="grow btn bg-blue-600 text-white"
                        onClick={handleSubmit}
                    >
                        Save Card
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
};
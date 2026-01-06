/* eslint-disable no-unused-vars */
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { addCard } from "../services/cardServices";
import { fixSpaces } from "../utils/format";

export default function AddCard({ deckId, onClose, loadAllDeck }) {

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleSubmit = async () => {
        try {
            const formatedName = fixSpaces(question);
            const formatedAnswer = fixSpaces(answer);
            const { success, message } = await addCard({ deckId, question: formatedName, answer: formatedAnswer });
            if (success) {
                loadAllDeck();
                onClose();
                return toast.success(message)

            };
            return toast.error(message, { toastId: "error-addCard" });
        } catch (error) {
            console.log('Error on handSubmit:', error);
        }
    }

    return (
        <div className="modal-style">
            <div className="">
                <div className="modal-title">
                    <p className="font-semibold">Edit Card</p>
                    <button
                        className="btn btn-square btn-ghost"
                        onClick={onClose}
                    >
                        <X />
                    </button>
                </div>

                <p className="font-semibold mb-1 text-gray-700">Question</p>
                <textarea
                    placeholder="Enter the question..."
                    className="border border-gray-300 w-full p-4 rounded-md h-25 mb-4 resize-none focus:outline-blue-700"
                    onChange={(e) => setQuestion(e.target.value)}
                />

                <p className="font-semibold mb-1 text-gray-700">Answer</p>
                <textarea
                    placeholder="Enter the answer..."
                    className="border border-gray-300 w-full p-4 rounded-md h-25 mb-4 resize-none focus:outline-blue-700"
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
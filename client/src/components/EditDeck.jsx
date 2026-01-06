/* eslint-disable no-unused-vars */
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fixSpaces } from "../utils/format";
import { editDeck, fetchOneDeck } from "../services/deckServices";

export default function EditDeck({ deckId, onClose, runFunction = () => { } }) {

    const [deckValues, setDeckValues] = useState('');

    const handleSubmit = async () => {
        try {
            const formatedName = fixSpaces(deckValues);
            const { success, message } = await editDeck({ deckId, deckName: formatedName });
            if (success) {
                runFunction();
                onClose();
                return toast.success(message);
            };
            return toast.error(message);
        } catch (error) {
            console.log('Error on handSubmit:', error);
        }
    }

    useEffect(() => {
        const loadValues = async () => {
            try {
                const { success, message, deck } = await fetchOneDeck(deckId);
                if (success) return setDeckValues(deck.deckName);
                return toast.error(message, { toastId: "error-editDeck" });
            } catch (error) {
                console.log('Error on loadValues:', error);
            }
        }
        loadValues();
    }, [deckId])

    return (
        <div className="modal-style">
            <div>
                <div className="modal-title">
                    <p className="font-semibold">Edit Deck</p>
                    <button
                        className="btn btn-square btn-ghost"
                        onClick={onClose}
                    >
                        <X />
                    </button>
                </div>
                <p className="font-semibold mb-1 text-gray-700 text-sm">Deck Name</p>
                <input
                    type="text"
                    placeholder="e.g., Biology, Spanish, Vocabulary..."
                    className="input w-full mb-4"
                    value={deckValues}
                    onChange={(e) => setDeckValues(e.target.value)}
                />
                <div className="flex gap-4">
                    <button
                        className="grow btn bg-blue-600 text-white"
                        onClick={handleSubmit}
                    >
                        Save Changes
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
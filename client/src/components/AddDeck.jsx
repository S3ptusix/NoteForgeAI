import { X } from "lucide-react";
import { useState } from "react";
import { addDeck } from "../services/deckServices";
import { toast } from "react-toastify";
import { fixSpaces } from "../utils/format";

export default function AddDeck({ onClose, loadAllDeck }) {

    const [deckName, setDeckName] = useState('');
    const [submiting, setSubmiting] = useState(false);

    const handleSubmit = async () => {
        try {
            setSubmiting(true);
            const formatedName = fixSpaces(deckName);
            const { success, message } = await addDeck({ deckName: formatedName });
            if (success) {
                loadAllDeck();
                onClose();
                return toast.success(message);

            };
            return toast.error(message, { toastId: "error-addDeck" });
        } catch (error) {
            console.error('Error on handleSubmit:', error);
        } finally {
            setSubmiting(false);
        }
    }

    return (
        <div className="modal-style">
            <div>
                <div className="modal-title">
                    <p className="font-semibold">Create New Deck</p>
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
                    onChange={(e) => setDeckName(e.target.value)}
                />
                <div className="flex gap-4">
                    <button
                        disabled={submiting}
                        className="grow btn not-disabled:bg-blue-600 not-disabled:text-white"
                        onClick={handleSubmit}
                    >
                        {submiting ? 'Creating...' : 'Create Deck'}
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
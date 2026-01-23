import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fixSpaces } from "../utils/format";
import { editDeck, fetchOneDeck } from "../services/deckServices";
import Loading from "./Loading";

export default function EditDeck({ deckId, onClose, runFunction = () => { } }) {

    const [deckName, setDeckName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const formatedName = fixSpaces(deckName);
            const { success, message } = await editDeck({ deckId, deckName: formatedName });
            if (success) {
                runFunction();
                onClose();
                return toast.success(message);
            };
            return toast.error(message);
        } catch (error) {
            console.error('Error on handleSubmit:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const loadValues = async () => {
            try {
                const { success, message, deck } = await fetchOneDeck(deckId);
                if (success) return setDeckName(deck.deckName);
                return toast.error(message, { toastId: "error-loadDeck" });
            } catch (error) {
                console.error('Error on loadValues:', error);
            }
        }
        loadValues();
    }, [deckId]);

    if (loading) return <Loading />

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
                    value={deckName}
                    onChange={(e) => setDeckName(e.target.value)}
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
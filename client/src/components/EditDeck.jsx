import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fixSpaces } from "../utils/format";
import { editDeck, fetchOneDeck } from "../services/deckServices";
import Loading from "./Loading";

export default function EditDeck({ deckId, onClose, runFunction = () => { } }) {

    const [deckName, setDeckName] = useState('');
    const [loading, setLoading] = useState(false);
    const [submiting, setSubmiting] = useState(false);

    const handleSubmit = async () => {
        try {
            setSubmiting(true);
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
            setSubmiting(false);
        }
    }

    useEffect(() => {
        const loadValues = async () => {
            try {
                setLoading(true);
                const { success, message, deck } = await fetchOneDeck(deckId);
                if (success) return setDeckName(deck.deckName);
                return toast.error(message, { toastId: "error-loadDeck" });
            } catch (error) {
                console.error('Error on loadValues:', error);
            } finally {
                setLoading(false);
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
                        disabled={submiting}
                        className="grow btn not-disabled:bg-blue-600 not-disabled:text-white"
                        onClick={handleSubmit}
                    >
                        {submiting ? 'Saving...' : 'Save Changes'}
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
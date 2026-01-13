import { FileText, GraduationCap, Layers, Sparkles } from "lucide-react";
import { useState } from "react";
import { generateFlashcard } from "../services/generateServices";
import { toast } from "react-toastify";
import Loading from "./Loading";

export default function GenerateMaterial({ runFunction = () => { } }) {

    const [notes, setNotes] = useState('');
    const [loading, setloading] = useState(false);

    const handleSubmitFlashcard = async () => {
        try {
            setloading(true);
            const { success, message } = await generateFlashcard({ notes: notes });
            if (success) {
                runFunction();
                toast.success(message);
                return

            };
            return toast.error(message);
        } catch (error) {
            console.error('Error on handleSubmitFlashcard:', error);
        } finally {
            setloading(false);
        }
    }

    return (
        <div className="border border-gray-300 rounded-lg p-4">
            <p className="flex gap-2 items-center font-semibold mb-4">
                <Sparkles size={16} />
                Generate Study Materials from Notes
            </p>
            <textarea
                placeholder="Paste your notes here. The system will automatically generate flashcards based on key concepts..."
                className="border border-gray-300 w-full p-4 rounded-lg h-75 mb-4 resize-none focus:outline-blue-700"
                onChange={(e) => setNotes(e.target.value)}
            />
            <div className="grid lg:grid-cols-3 gap-4">
                <button
                    disabled={loading || notes.trim() === ''}
                    className="flex gap-2 items-center justify-center cursor-pointer bg-blue-600 text-white w-full rounded-lg p-4 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 duration-150"
                    onClick={handleSubmitFlashcard}
                >
                    <Layers size={16} />
                    Generate Flashcards
                </button>
                <button
                    disabled={loading || notes.trim() === ''}
                    className="flex gap-2 items-center justify-center cursor-pointer bg-green-600 text-white w-full rounded-lg p-4 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 duration-150"
                >
                    <GraduationCap size={16} />
                    Generate Quiz
                </button>
                <button
                    disabled={loading || notes.trim() === ''}
                    className="flex gap-2 items-center justify-center cursor-pointer bg-purple-600 text-white w-full rounded-lg p-4 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 duration-150"
                >
                    <FileText size={16} />
                    Generate Reviewer
                </button>
            </div>
            {loading && <Loading />}
        </div>
    )
}
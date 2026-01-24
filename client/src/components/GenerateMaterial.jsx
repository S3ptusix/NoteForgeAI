import { EllipsisVertical, FileText, Gavel, GraduationCap, Layers, Sparkles } from "lucide-react";
import { useState } from "react";
import { generateFlashcard, generateQuiz, generateReviewer } from "../services/generateServices";
import { toast } from "react-toastify";
import Loading from "./Loading";

export default function GenerateMaterial({ runFunction = () => { } }) {

    const [notes, setNotes] = useState('');
    const [loading, setloading] = useState(false);

    const [showButton, setShowButton] = useState('flashcards');
    const [openMenu, setOpenMenu] = useState(false);

    const handleGenerateFlashcard = async () => {
        try {
            setloading(true);
            const { success, message } = await generateFlashcard({ notes: notes });
            if (success) {
                runFunction();
                toast.success(message);
                setNotes('');
                return

            };
            return toast.error(message);
        } catch (error) {
            console.error('Error on handleGenerateFlashcard:', error);
        } finally {
            setloading(false);
        }
    }

    const handleGenerateQuiz = async () => {
        try {
            setloading(true);
            const { success, message } = await generateQuiz({ notes: notes });
            if (success) {
                runFunction();
                toast.success(message);
                setNotes('');
                return

            };
            return toast.error(message);
        } catch (error) {
            console.error('Error on handleGenerateQuiz:', error);
        } finally {
            setloading(false);
        }
    }

    const handleGenerateReviewer = async () => {
        try {
            setloading(true);
            const { success, message } = await generateReviewer({ notes: notes });
            if (success) {
                runFunction();
                toast.success(message);
                setNotes('');
                return

            };
            return toast.error(message);
        } catch (error) {
            console.error('Error on handleGenerateReviewer:', error);
        } finally {
            setloading(false);
        }
    }

    return (
        <div className="relative border border-gray-300 rounded-lg p-4">
            <p className="flex gap-2 items-center font-semibold mb-4">
                <Sparkles size={16} />
                Generate Study Materials from Notes
            </p>
            <textarea
                placeholder="Paste your notes here. The system will automatically generate study materials based on key concepts..."
                className="border border-gray-300 w-full p-4 rounded-lg h-75 mb-4 resize-none focus:outline-blue-700"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />
            <div className="flex gap-4">
                {showButton === 'flashcards' &&
                    <button
                        disabled={loading || notes.trim() === ''}
                        className="text-sm flex gap-2 items-center justify-center cursor-pointer bg-blue-600 text-white w-full rounded-sm disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 duration-150"
                        onClick={handleGenerateFlashcard}
                    >
                        <Layers size={16} />
                        Forge Flashcards
                    </button>
                }
                {showButton === 'quizzes' &&
                    <button
                        disabled={loading || notes.trim() === ''}
                        className="text-sm flex gap-2 items-center justify-center cursor-pointer bg-green-600 text-white w-full rounded-sm disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 duration-150"
                        onClick={handleGenerateQuiz}
                    >
                        <GraduationCap size={16} />
                        Forge Quiz
                    </button>
                }
                {showButton === 'reviewers' &&
                    <button
                        disabled={loading || notes.trim() === ''}
                        className="text-sm flex gap-2 items-center justify-center cursor-pointer bg-purple-600 text-white w-full rounded-sm disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 duration-150"
                        onClick={handleGenerateReviewer}
                    >
                        <FileText size={16} />
                        Forge Reviewer
                    </button>
                }

                <button
                    className="btn btn-square btn-neutral shadow-none"
                    onClick={() => setOpenMenu(prev => !prev)}
                >
                    <EllipsisVertical />
                </button>
                {openMenu &&
                    <ul className="absolute bg-white shadow-md right-4 top-1/1 min-w-50 rounded-md z-10 overflow-hidden">
                        <li
                            className="flex gap-2 items-center p-4 hover:bg-gray-200 border-b border-gray-300 pointer-events-none"
                        >
                            <Gavel size={16} />
                            Forge
                        </li>
                        <li
                            className={`flex gap-2 items-center px-4 py-2 cursor-pointer duration-150 ${showButton === 'flashcards' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`}
                            onClick={() => setShowButton('flashcards')}
                        >
                            <Layers size={16} />
                            Decks

                        </li>
                        <li
                            className={`flex gap-2 items-center px-4 py-2 cursor-pointer duration-150 ${showButton === 'quizzes' ? 'bg-green-600 text-white' : 'hover:bg-gray-200'}`}
                            onClick={() => setShowButton('quizzes')}
                        >
                            <GraduationCap size={16} />
                            Quizzes
                        </li>
                        <li
                            className={`flex gap-2 items-center px-4 py-2 cursor-pointer duration-150 ${showButton === 'reviewers' ? 'bg-purple-600 text-white' : 'hover:bg-gray-200'}`}
                            onClick={() => setShowButton('reviewers')}
                        >
                            <FileText size={16} />
                            Reviewers
                        </li>
                    </ul>
                }
            </div> 
            {loading && <Loading />}
        </div>
    )
}
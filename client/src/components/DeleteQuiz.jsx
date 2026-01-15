import { TriangleAlert } from "lucide-react";
import { toast } from "react-toastify";
import { deleteQuiz } from "../services/quizServices.";

export default function DeleteQuiz({ quizId, onClose, loadAllQuiz }) {


    const handleSubmit = async () => {
        try {
            const { success, message } = await deleteQuiz(quizId);
            if (success) {
                loadAllQuiz();
                onClose();
                return toast.success(message);
            };
            return toast.error(message);
        } catch (error) {
            console.error('Error on handleSubmit:', error);
        }
    }

    return (
        <div className="modal-style">
            <div>
                <div className="flex gap-4">
                    <div className="text-red-600 bg-red-600/25 h-fit p-2 rounded-full">
                        <TriangleAlert />
                    </div>
                    <div className="mb-4">
                        <p className="text-lg font-semibold mb-2">Delete Quiz</p>
                        <p className="text-gray-700">Are you sure you want to delete this quiz? This action cannot be undone.</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        className="btn btn-ghost border-gray-300"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn bg-red-600 text-white"
                        onClick={handleSubmit}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
};
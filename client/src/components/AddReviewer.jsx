import { X } from "lucide-react"
import { useState } from "react"
import RichTextEditor from "./RichTextEditor";
import { cleanHTML } from "../utils/format";
import { addReviewer } from "../services/ReviewerServices";
import { toast } from "react-toastify";

export default function AddReviewer({ onClose }) {

    const [reviewerName, setReviewerName] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async () => {
        try {
            const { success, message } = await addReviewer({ reviewerName, content });
            if (success) {
                toast.success(message);
                onClose();
                return
            }
            return toast.error(message);
        } catch (error) {
            console.log('Error on handleSubmit:', error);
        }
    }

    return (
        <div className="modal-style">
            <div className="wide-modal">
                <div className="modal-title">
                    <p className="font-semibold">Create Reviewer</p>
                    <button
                        className="btn btn-square btn-ghost"
                        onClick={onClose}
                    >
                        <X />
                    </button>
                </div>
                <p className="font-semibold mb-1 text-gray-700 text-sm">Reviewer Name</p>
                <input
                    type="text"
                    placeholder="Enter reviewer name"
                    className="input w-full mb-4"
                    onChange={(e) => setReviewerName(e.target.value)}
                />

                <p className="font-semibold mb-1 text-gray-700 text-sm">Content</p>
                {/* <textarea
                    placeholder="Enter the answer..."
                    className="border border-gray-300 w-full p-4 rounded-md h-100 mb-4 resize-none focus:outline-blue-700"
                    onChange={(e) => setContent(e.target.value)}
                /> */}
                <div className="mb-4">
                    <RichTextEditor
                        setContent={(html) =>
                            setContent(cleanHTML(html))
                        }
                    />
                </div>

                <div className="flex gap-4">
                    <button
                        className="grow btn bg-blue-600 text-white"
                        onClick={handleSubmit}
                    >
                        Create reviewer
                    </button>
                    <button
                        className="btn border-gray-300"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div >
    )
}
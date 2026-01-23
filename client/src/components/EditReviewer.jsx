/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { cleanHTML } from "../utils/format";
import RichTextEditor from "./RichTextEditor";
import { X } from "lucide-react";
import { editReviewer, fetchOneReviewer } from "../services/ReviewerServices";
import { toast } from "react-toastify";
import Loading from "./Loading";

export default function EditReviewer({ reviewerId, onClose, loadAllReviewer }) {

    const [reviewerName, setReviewerName] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [submiting, setSubmiting] = useState(false);

    const handleSubmit = async () => {
        try {
            setSubmiting(true);
            const { success, message } = await editReviewer({ reviewerId, reviewerName, content });
            if (success) {
                toast.success(message);
                loadAllReviewer();
                return;
            }
            return toast.error(message);
        } catch (error) {
            console.error('Error on handleSubmit:', error);
        } finally {
            setSubmiting(false);
        }
    }

    useEffect(() => {
        try {
            setLoading(true);
            const loadReviewer = async () => {
                const { success, message, reviewer } = await fetchOneReviewer(reviewerId);
                if (success) {
                    setReviewerName(reviewer.reviewerName);
                    setContent(reviewer.content);
                    return
                }
                return toast.error(message);
            }
            loadReviewer();
        } catch (error) {
            console.error('Error on LoadReviewer:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="modal-style">
            <div className="wide-modal flex flex-col">
                <div className="modal-title">
                    <p className="font-semibold">Edit Reviewer</p>
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
                    className="input w-full mb-4 py-2"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                />

                <p className="font-semibold mb-1 text-gray-700 text-sm">Content</p>
                <div className="grow mb-4">
                    <RichTextEditor
                        content={content}
                        setContent={(html) =>
                            setContent(cleanHTML(html))
                        }
                    />
                </div>

                <div className="flex gap-4">
                    <button
                        disabled={submiting}
                        className="grow btn not-disabled:bg-blue-600 not-disabled:text-white"
                        onClick={handleSubmit}
                    >
                        {submiting ? 'Updating...' : 'Update reviewer'}
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
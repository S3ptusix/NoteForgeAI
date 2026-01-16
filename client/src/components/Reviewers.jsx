import { Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteReviewer from "./DeleteReviewer";

export default function Reviewers({ reviewers, loadAllReviewer }) {

    const [reviewerId, setReviewerId] = useState(null);

    const [openDeleteReviewer, setOpenDeleteReviewer] = useState(false);

    const handleDelete = (reviewerId) => {
        setReviewerId(reviewerId);
        setOpenDeleteReviewer(true);
    }

    return (
        <div className="grid grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1 gap-4">
            {reviewers.map((reviewer) => (
                <div key={reviewer.id} className="border border-gray-300 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                        <p className="font-semibold">{reviewer.reviewerName}</p>
                    </div>

                    <div className="relative mb-4">
                        <div
                            className="EditorContent h-16 overflow-hidden wrap-break-word text-gray-400"
                            dangerouslySetInnerHTML={{ __html: reviewer.content }}
                        />
                        {/* Fade overlay */}
                        <div className="absolute bottom-0 left-0 w-full h-10 bg-linear-to-t from-white to-transparent" />
                    </div>



                    <div className="flex gap-2">
                        <button
                            className="btn grow bg-violet-600 text-white"
                        // onClick={() => navigate(`/app/takeQuiz/${quiz.id}`)}
                        >
                            <Eye size={16} />
                            View
                        </button>

                        <button
                            className="btn btn-square bg-red-600 text-white"
                            onClick={() => handleDelete(reviewer.id)}
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            ))}

            {openDeleteReviewer &&
                <DeleteReviewer
                    reviewerId={reviewerId}
                    onClose={() => setOpenDeleteReviewer(false)}
                    loadAllReviewer={loadAllReviewer}
                />
            }
        </div>
    );
}
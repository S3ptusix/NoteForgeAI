import { ArrowLeft, Plus } from "lucide-react";
import Topbar from "../components/Topbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AddReviewer from "../components/AddReviewer";
import { fetchAllReviewer } from "../services/ReviewerServices";
import { toast } from "react-toastify";
import Reviewers from "../components/Reviewers";

export default function ReviewersPage() {

    const [openAddReviewer, setOpenAddReviewer] = useState(false);
    const [data, setData] = useState([]);

    const loadAllReviewer = async () => {
        try {
            const { success, message, reviewers } = await fetchAllReviewer();
            if (success) return setData(reviewers);
            return toast.error(message);
        } catch (error) {
            console.error('Error on loadAllReviewer:', error);
        }
    }

    useEffect(() => {
        queueMicrotask(() => {
            loadAllReviewer();
        });
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Topbar />
            <div className="grow mx-[10vw] py-8">
                <Link to={'/app'}
                    className="flex items-center cursor-pointer gap-2 text-gray-700"
                >
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>
                <section className="my-4">
                    <div className="flex items-center justify-between mb-4">
                        <p className="font-semibold">My Reviewers</p>

                        <button
                            className="btn bg-violet-600 text-white"
                            onClick={() => setOpenAddReviewer(true)}
                        >
                            <Plus size={16} />
                            New Reviewer
                        </button>
                    </div>

                    <Reviewers
                        reviewers={data}
                        loadAllReviewer={loadAllReviewer}
                    />
                </section>
            </div>
            {openAddReviewer &&
                <AddReviewer
                    onClose={() => setOpenAddReviewer(false)}
                    loadAllReviewer={loadAllReviewer}
                />
            }
        </div>
    )
}
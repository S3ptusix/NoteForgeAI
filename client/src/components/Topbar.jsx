import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Topbar() {

    const navigate = useNavigate();

    return (
        <div className="px-[10vw] py-4 border-b border-gray-300">
            <button
                className="flex gap-2 text-blue-600 items-center cursor-pointer"
                onClick={() => navigate('/')}
            >
                <BookOpen />
                <p className="font-semibold text-lg">NOTE2CARD</p>
            </button>
        </div>
    )
};
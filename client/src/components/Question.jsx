import { Trash2 } from "lucide-react";

export default function Question({ index, question, totalQuestions, setQuestions }) {

    const updateQuestion = (field, value) => {
        setQuestions(prev =>
            prev.map((q, i) => (i === index ? { ...q, [field]: value } : q))
        );
    };

    const removeQuestion = () => {
        setQuestions(prev => prev.filter((_, i) => i !== index));
    };
    return (

        <div className="border border-gray-300 p-4 rounded-lg mb-4">
            <div className="flex justify-between mb-4">
                <p className="font-semibold text-sm">Question {index + 1}</p>
                {totalQuestions > 1 &&
                    <button
                        className="cursor-pointer"
                        onClick={() => removeQuestion(index)}
                    >
                        <Trash2 size={16} className="text-red-500" />
                    </button>
                }
            </div>
            <input
                type="text"
                placeholder="Enter your question"
                className="input w-full mb-4"
                value={question.question}
                onChange={(e) => updateQuestion('question', e.target.value)}
            />

            <p className="text-sm text-gray-400 mb-2">Options select the correct answer):</p>
            {['A', 'B', 'C', 'D'].map(opt => (
                <div key={opt} className="flex gap-2 mt-2">
                    <input
                        type="radio"
                        name={`question-${index}`}
                        checked={question.answer === opt}
                        onChange={() => updateQuestion('answer', opt)}
                    />
                    <input
                        type="text"
                        placeholder={`Option ${opt}`}
                        value={question[`option${opt}`]}
                        className="grow input"
                        onChange={e => updateQuestion(`option${opt}`, e.target.value)}
                    />
                </div>
            ))}
        </div>
    );
}
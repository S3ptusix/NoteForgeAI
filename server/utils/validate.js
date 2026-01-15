import validator from 'validator';

export const validateFullName = (name) => {
    if (typeof name !== "string") {
        return "Name must be a string";
    };
    if (name.length < 4) {
        return 'Name must be at least 4 characters long';
    }
    // Only letters, spaces, hyphens, apostrophes
    const validPattern = /^[A-Za-z '-]+$/;
    if (!validPattern.test(name)) {
        return "Name contains invalid characters";
    };

    return null
}

// USERNAME VALIDATION
export const validateUsername = (username) => {
    if (!username) {
        return 'Username is required';
    }
    if (hasSpace(username)) {
        return 'Username cannot contain spaces';
    }
    if (!validator.isLength(username, { min: 8 })) {
        return 'Username must be at least 8 characters long';
    }

    return null;
};

// PASSWORD VALIDATION
export const validatePassword = (password) => {
    if (!password) {
        return 'Password is required';
    }
    if (hasSpace(password)) {
        return 'Password cannot contain spaces';
    }
    if (!validator.isLength(password, { min: 8 })) {
        return 'Password must be at least 8 characters long';
    }
    if (!/[A-Z]/.test(password)) {
        return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
        return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(password)) {
        return 'Password must contain at least one number';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return 'Password must contain at least one special character';
    }

    return null;
};

export const isValidFlashcard = (flashcard) => {
    if (!flashcard || typeof flashcard !== "object") return false;

    // Check deck
    if (!flashcard.deck || typeof flashcard.deck.title !== "string" || !flashcard.deck.title.trim()) {
        return false;
    }

    // Check cards
    if (!Array.isArray(flashcard.cards) || flashcard.cards.length === 0) return false;

    // Optional: check that each card has question & answer
    for (const card of flashcard.cards) {
        if (
            !card ||
            typeof card.question !== "string" || !card.question.trim() ||
            typeof card.answer !== "string" || !card.answer.trim()
        ) {
            return false;
        }
    }

    return true;
};

// CHECK IF STRING HAS SPACES'
export const hasSpace = (value) => {
    return typeof value === "string" && value.includes(" ");
}

// VALIDATE QUESTIONS
export const validateQuestions = (questions) => {
    if (!Array.isArray(questions) || questions.length === 0) {
        return "Please add at least one question.";
    }

    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];

        if (!question.question?.trim()) {
            return `Question ${i + 1} is missing its question text.`;
        }

        // Trim options
        question.optionA = question.optionA?.trim();
        question.optionB = question.optionB?.trim();
        question.optionC = question.optionC?.trim();
        question.optionD = question.optionD?.trim();

        if (!question.optionA || !question.optionB || !question.optionC || !question.optionD) {
            return `Please complete all option choices for Question ${i + 1}.`;
        }

        // // Check duplicate options
        // const options = [question.optionA, question.optionB, question.optionC, question.optionD];
        // if (new Set(options).size !== 4) {
        //     return `All options for Question ${i + 1} must be unique.`;
        // }

        if (!question.answer) {
            return `Please select the correct answer for Question ${i + 1}.`;
        }

        // Normalize answer
        question.answer = question.answer.toUpperCase();
        if (!["A", "B", "C", "D"].includes(question.answer)) {
            return `The correct answer for Question ${i + 1} must be A, B, C, or D.`;
        }
    }

    return null; // all valid
};



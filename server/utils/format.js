export const fixSpaces = (str) => str.replace(/\s+/g, " ").trim();

export const capitalizeWords = (value) => {
    if (typeof value !== "string") return "";

    return value
        .split(" ")
        .map(word => {
            if (word.length === 0) return ""; // handle multiple spaces
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
}
export const fixSpaces = (str) => str.replace(/\s+/g, " ").trim();

export const cleanHTML = (html) => {
    // 1. Normalize empty <p> variations
    let cleaned = html.replace(/<p>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, '<p></p>');

    // 2. Remove empty <p></p> at the start
    cleaned = cleaned.replace(/^(<p><\/p>\s*)+/g, '');

    // 3. Remove empty <p></p> at the end
    cleaned = cleaned.replace(/(\s*<p><\/p>)+$/g, '');

    // 4. Reduce multiple empty <p></p> in the middle to ONE only
    cleaned = cleaned.replace(/(<p><\/p>\s*){2,}/g, '<p></p>');

    return cleaned.trim();
};

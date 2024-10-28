export const cleanJSON = (text) => {
    return text.replace(/,(\s*[}\]])/g, '$1');
};
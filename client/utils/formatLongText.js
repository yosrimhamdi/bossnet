export default (text, max) => {
    if (text.length > max) {
        return `${text.slice(0, max)}...`
    }
    return text;
}
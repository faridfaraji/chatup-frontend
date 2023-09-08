
const partialLinkRegex = /\[([^\]]+)\]\([^)]*$/
const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
const emailRegex = /\b([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})\b/g;
const phoneRegex = /\b((?:\+?1\s*\(?[2-9][0-8][0-9]\)?\s*|0?[2-9][0-8][0-9]\s*)(?:[.-]\s*)?(?:[2-9][0-9]{2}\s*)(?:[.-]\s*)?[0-9]{4})\b/g;

export const processText = (text) => {
    if (!text || text === "") return ""

    let processedText = text
    
    processedText = processedText.replace(partialLinkRegex, '[$1]...');
    processedText = processedText.replace(markdownLinkRegex, '<a href="https://$2">$1</a>');
    processedText = processedText.replace(emailRegex, '<a href="mailto:$1">$1</a>');
    processedText = processedText.replace(phoneRegex, '<a href="tel:$1">$1</a>');

    return processedText
}

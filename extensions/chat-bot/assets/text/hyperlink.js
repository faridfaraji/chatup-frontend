

// Define regular expressions to match URLs, emails, and phone numbers
const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
const emailRegex = /\b([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})\b/g;
const phoneRegex = /\b((?:\+?1\s*\(?[2-9][0-8][0-9]\)?\s*|0?[2-9][0-8][0-9]\s*)(?:[.-]\s*)?(?:[2-9][0-9]{2}\s*)(?:[.-]\s*)?[0-9]{4})\b/g;


// This function hyperlinks URLs, emails, and phone numbers and removes dots after hyperlinks
function hyperlinkText(element) {
  const messageText = element.textContent;
  if (messageText !== null) {
    let modifiedText = messageText;
    if (!element.dataset?.hyperlinked) {
      modifiedText = modifiedText.replace(markdownLinkRegex, '<a href="https://$2">$1</a>');
      modifiedText = modifiedText.replace(emailRegex, '<a href="mailto:$1">$1</a>');
      modifiedText = modifiedText.replace(phoneRegex, '<a href="tel:$1">$1</a>');
    }

    // Replace only the message content, excluding the timestamp div
    element.childNodes.forEach(childNode => {
      if (!childNode.classList || !childNode.classList.contains('chatbubble-message-time')) {
        element.removeChild(childNode);
      }
    });
    element.innerHTML = modifiedText;
  }
}


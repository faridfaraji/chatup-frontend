
export const autoResizeTextarea = (elementId) => {
  const textarea = document.querySelector(elementId);
  textarea.style.height = 'auto'; // Reset height to auto
  textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scroll height
  
  // Reset the height to the default value after sending a message
  if (textarea.style.height === '54px') {
    textarea.style.height = '54px';
  }
}

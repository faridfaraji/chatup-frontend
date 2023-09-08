
export const autoResizeTextarea = (elementId) => {
  const textarea = document.getElementById(elementId);
  textarea.style.height = 'auto'; // Reset height to auto
  textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scroll height
  
  // Reset the height to the default value after sending a message
  if (this.style.height === '54px') {
    this.style.height = '54px';
  }
}
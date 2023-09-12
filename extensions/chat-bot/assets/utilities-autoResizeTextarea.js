
export const autoResizeTextarea = (elementId) => {
  const textarea = document.querySelector(elementId);
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;
}

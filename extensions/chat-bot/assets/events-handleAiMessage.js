import { class_selector, id_selector } from "./constants.js"
import { addMessage, createAiMessage } from "./ui.js"
import { processText, scrollToLatestMessage } from "./utilities.js"
import { aiTimeout } from "./events.js"

let accumulatedText = ""

export const handleAiMessage = (message) => {
  // If AI messages are coming in, we want to disable input for the next second
  aiTimeout()

  // Fetch quest
  var messagesContainer = document.querySelector(id_selector.messages_div_id)
  var latestMessage = messagesContainer.lastElementChild;

  // Append a new message container and reset the accumulated text if AI is not
  // the latest message
  if (!latestMessage.classList.includes(class_selector.ai_message_div_class)) {
    const aiMessage = createAiMessage()
    addMessage(aiMessage)
    scrollToLatestMessage()
    accumulatedText = ""
    handleAiMessage(message)
    // Otherwise we're spittin', so keep spittin'
  } else {
    accumulatedText += message
    const textContainer = document.createElement("pre")
    textContainer.innerHTML = processText(accumulatedText)
    latestMessage.innerHTML = ""
    latestMessage.appendChild(textContainer)
  }
}

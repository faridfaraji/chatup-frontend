import { class_selector, id_selector } from "../constants"

export const createCustomerMessage = () => {
  const textarea = document.querySelector(id_selector.input_textarea_id)
  const messageText = textarea.value.trim()
  textarea.placeholder = ""
  textarea.value = ""
  textarea.focus()

  // If there was no message to speak of, we get out of here
  if (!messageText || messageText === "") {
    return null
  }

  // Create the div 
  var customerMessage = document.createElement("div")

  // Add classes
  customerMessage.classList.add(class_selector.message_div_class)
  customerMessage.classList.add(class_selector.customer_message_div_class)

  // Add content
  customerMessage.textContent = messageText
  customerMessage.setAttribute("data-timestamp", Date.now())
  customerMessage.style.opacity = "0"

  // Add timestamp
  var timestamp = document.createElement("div")
  timestamp.classList.add(class_selector.timestamp_div_class)
  timestamp.innerText = createTimestamp()
  customerMessage.appendChild(timestamp)

  return { customerMessage, messageText }
}

export const createAdminMessage = (message) => {
  if(!message || message === "") return null

  // Create the div 
  var adminMessage = document.createElement("div")

  // Add classes
  adminMessage.classList.add(class_selector.message_div_class)
  adminMessage.classList.add(class_selector.admin_message_div_class)

  // Add content
  adminMessage.textContent = message
  adminMessage.setAttribute("data-timestamp", Date.now())
  adminMessage.style.opacity = "0"

  // Add timestamp
  var timestamp = document.createElement("div")
  timestamp.classList.add(class_selector.timestamp_div_class)
  timestamp.innerText = createTimestamp()
  adminMessage.appendChild(timestamp)

  return adminMessage
}

export const createAiMessage = () => {
    // Create the div 
    var aiMessage = document.createElement("div")

    // Add classes
    aiMessage.classList.add(class_selector.message_div_class)
    aiMessage.classList.add(class_selector.ai_message_div_class)
  
    // Add content
    aiMessage.setAttribute("data-timestamp", Date.now())
    aiMessage.style.opacity = "0"
    
    return aiMessage
}
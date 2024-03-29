import { class_name, id_selector } from "./constants.js"
import { createTimestamp } from "./utilities.js"

export const createCustomerMessage = () => {
  const textarea = document.querySelector(id_selector.input_textarea_id)
  const messageText = textarea.value.trim()
  textarea.placeholder = ""
  textarea.value = ""
  textarea.focus()

  // If there was no message to speak of, we get out of here
  if (!messageText || messageText === "") {
    return { customerMessage: null, messageText }
  }

  // Create the div 
  var customerMessage = document.createElement("div")

  // Add classes
  customerMessage.classList.add(class_name.message_div_class)
  customerMessage.classList.add(class_name.customer_message_div_class)

  // Add data
  customerMessage.setAttribute("data-timestamp", Date.now())
  customerMessage.style.opacity = "0"

  // Add content
  customerMessage.textContent = messageText

  // Add timestamp
  var timestamp = document.createElement("div")
  timestamp.classList.add(class_name.customer_timestamp_div_class)
  timestamp.innerText = createTimestamp()
  customerMessage.appendChild(timestamp)

  return { customerMessage, messageText }
}

export const createAdminMessage = (message) => {
  if(!message || message === "") return null

  // Create the div 
  var adminMessage = document.createElement("div")

  // Add classes
  adminMessage.classList.add(class_name.message_div_class)
  adminMessage.classList.add(class_name.admin_message_div_class)

  // Add data
  adminMessage.setAttribute("data-timestamp", Date.now())
  adminMessage.style.opacity = "0"

  // Add content
  adminMessage.textContent = message

  // Add timestamp
  var timestamp = document.createElement("div")
  timestamp.classList.add(class_name.admin_timestamp_div_class)
  timestamp.innerText = createTimestamp()
  adminMessage.appendChild(timestamp)

  return adminMessage
}

export const createAdminPartMessage = (messageText) => {
  var message = document.createElement("div")
  var divider = document.createElement("div")
  var subDivider = document.createElement("div")
  var text = document.createElement("div")
  message.classList.add(class_name.admin_part_message_class)
  divider.classList.add(class_name.admin_part_divider_class)
  divider.appendChild(subDivider)
  text.classList.add(class_name.admin_part_text_class)
  text.innerText = messageText
  message.appendChild(divider)
  message.appendChild(text)
  return message
}

export const createAdminForfeitMessage = () => {

}

export const createAiMessage = () => {
    // Create the div 
    var aiMessage = document.createElement("div")

    // Add classes
    aiMessage.classList.add(class_name.message_div_class)
    aiMessage.classList.add(class_name.ai_message_div_class)

    // Add data
    aiMessage.setAttribute("data-timestamp", Date.now())
    aiMessage.style.opacity = "0"
    
    return aiMessage
}

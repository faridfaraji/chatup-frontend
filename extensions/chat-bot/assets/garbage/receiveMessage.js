
export const listenForAiResponse = (details) => {
  socket.on("ai_response", function (data) {
    console.log(data);
    displayAiResponse(data, details);
  });
  socket.on("admin_response", function (data) {
    console.log(data);
    displayAiResponse(data, details);
  });
}


import React, { useState } from 'react';
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import { useAppBridge } from "@shopify/app-bridge-react";

export const ChatPrompt = () => {
  const [text, setText] = useState('');
  const app = useAppBridge();
  const storeId = null
  console.log(app.hostOrigin)
  const handleInputChange = (event) => {
    setText(event.target.value);
  };
  const fetch = useAuthenticatedFetch();

  const handleSaveClick = () => {
    // Send the text to a post endpoint
    const response = fetch(`/api/prompt`, 
    	{
			method: "POST", 
			body: JSON.stringify({ prompt: text, storeUrl: app.hostOrigin }),
			headers:{'content-type': 'application/json'}
		});
  };
  
  return (
    <div>
      <h3>Prompt</h3>
      <textarea
        value={text}
        onChange={handleInputChange}
        rows={20}
        cols={80}
        placeholder="Enter your prompt..."
      />
      <br />
      <button onClick={handleSaveClick}>Save</button>
    </div>
  );
};


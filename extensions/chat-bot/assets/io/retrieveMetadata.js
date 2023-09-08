
export const retrieveMetadata = async () => {
    return fetch('https://ipinfo.io/json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Fetch failed with status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        return data; // Return the response data as metadata
      })
      .catch(error => {
        console.error('Error fetching IP', error);
      });
  };
  

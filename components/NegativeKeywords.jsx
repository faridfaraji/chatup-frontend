import { Tag, LegacyStack, AlphaCard, Form, FormLayout, TextField, Button } from '@shopify/polaris';
import { useState, useCallback, useEffect } from 'react';
import { useAuthenticatedFetch } from '../hooks';

export const NegativeKeywords = () => {
  let afetch = useAuthenticatedFetch()

  // Initialize values
  const [selectedTags, setSelectedTags] = useState([
    //todo GET(...)
    'Rustic',
    'Antique',
    'Vinyl',
    'Refurbished'
  ]);
  const [value, setValue] = useState('');

  // As user types, update value accordingly
  const handleChange = (newValue) => {
    setValue(newValue)
  };

  // When the component mounts, we want to fetch the initial keywords
  // these should be obtainable from the server's database of information from each store
  // We should try until we can populate the list of existing keywords and inform the user
  // if there is an issue with contacting the database, but assure them that their negative keywords
  // are still being used to generate their chatbot's responses even though we cannot fetch them
  useEffect(() => {
    fetchNegativeKeywords();
  }, []);

  const fetchNegativeKeywords = async () => {
    afetch(
      'https://695c-34-125-95-96.ngrok-free.app/database/v1/shops/72856895765/negative-keywords', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        accept: 'application/json',
        "ngrok-skip-browser-warning": "true"
      }
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
    }).then((data) => {
      setSelectedTags(data)
    }).catch((error) => console.error('Failed to fetch negative keywords:', error));
  };

  // If we get a successful response from the server we will delete the keyword that the
  // user wanted to remove. If we don't get a successful response from the server, we 
  // should inform the user that their keyword was not necessarily deleted.
  const removeTag = useCallback((tag) => async () => {
    afetch(`https://695c-34-125-95-96.ngrok-free.app/database/v1/shops/72856895765/negative-keywords/${tag}`, {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        accept: 'application/json',
        "ngrok-skip-browser-warning": "true"
      }
    }).then((response) => {
      if (response.ok) {
        setSelectedTags((previousTags) =>
          previousTags.filter((previousTag) => previousTag !== tag)
        )
      }
    }).catch((error) => console.error('Failed to delete negative keyword:', error));
  }, []);

  // Tags are well defined in Polaris so we only need to specify a small number of parameters
  const tagMarkup = selectedTags.map((option) => (
    <Tag key={option} onRemove={removeTag(option)}>
      {option}
    </Tag>
  ));

  // If we get a successful response from the server we will add the keyword to the list
  // of tags. If we don't get a successful response we should inform the user that their
  // keyword can't be confirmed but wasn't necessarily not added and that a refresh should
  // refresh their displayed list of keywords
  const addTag = async (tag) => {
    afetch(
      `https://695c-34-125-95-96.ngrok-free.app/database/v1/shops/72856895765/negative-keywords/${tag}`, {
      method: 'PUT',
      credentials: 'same-origin',
      headers: {
        accept: 'application/json',
        "ngrok-skip-browser-warning": "true"
      }
    }).then((response) => {
      if (response.ok) {
        setSelectedTags((previousTags) => [...previousTags, tag])
        setValue('')
      }
    }).catch((error) => console.error('Failed to add negative keyword:', error));
  };

  // We only want to execute a server request if the tag to be added is valid
  const handleSubmit = (event) => {
    event.preventDefault();
    if (value !== '' && !selectedTags.includes(value)) {
      addTag(value);
    }
  };


  return (
    <AlphaCard>
      <Form onSubmit={handleSubmit}>
        <FormLayout>
          {/* We want the text field and button on the same line */}
          <div style={{ display: 'flex', 'align-items': 'center' }}>
            <div style={{ 'flex-grow': '1', 'margin-right': '1rem' }}>
              <TextField
                value={value}
                onChange={handleChange}
                label="Negative Keywords"
                helpText={
                  <span>
                    We'll ensure ChatUp avoids these keywords
                  </span>
                }
              />
            </div>
            <div style={{}}>
              <Button submit>Submit</Button>
            </div>
          </div>
        </FormLayout>
      </Form>
      <br /><br />
      <LegacyStack spacing="tight">{tagMarkup}</LegacyStack>
    </AlphaCard>
  )
}

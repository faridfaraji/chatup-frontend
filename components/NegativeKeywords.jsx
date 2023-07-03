import { Tag, Form, FormLayout, TextField, Button, VerticalStack, HorizontalStack, Box } from '@shopify/polaris';
import { useState, useCallback, useEffect, useTransition } from 'react';
import { getNegativeKeywords, changeNegativeKeywords } from '../utils/negativeKeywords';
import cache from '../cache';
import { useTranslation } from 'react-i18next';
import { useAuthenticatedFetch } from "../hooks"

export const NegativeKeywords = (props) => {
  // const afetch = useAuthenticatedFetch();
  const { t } = useTranslation()

  // Initialize values
  const [selectedTags, setSelectedTags] = useState(cache.negative_keywords);
  const [value, setValue] = useState('');


  // cache the keywords for popover/reload whenever they change
  const cacheKeywords = () => { cache.negative_keywords = selectedTags }
  useEffect(() => cacheKeywords(), [selectedTags])

  // As user types, update value accordingly
  const handleChange = (newValue) => {
    setValue(newValue)
  };

  // When the component mounts, we want to fetch the initial keywords
  // these should be obtainable from the server's database of information from each store
  // We should try until we can populate the list of existing keywords and inform the user
  // if there is an issue with contacting the database, but assure them that their negative keywords
  // are still being used to generate their chatbot's responses even though we cannot fetch them
  useEffect(() => getSetNegativeKeywords(), []);

  // useTransition() here?
  const getSetNegativeKeywords = function () {
    if (cache.shop_identifier === 0) {
      setTimeout(getSetNegativeKeywords, 50)
    } else {
      getNegativeKeywords(afetch)
        .then((fetched) => setSelectedTags(fetched))
    }
  }

  // If we get a successful response from the server we will delete the keyword that the
  // user wanted to remove. If we don't get a successful response from the server, we 
  // should inform the user that their keyword was not necessarily deleted.
  const removeTag = useCallback((tag) => async () => {
    changeNegativeKeywords("DELETE", tag
    // , afetch
    )
      .then((response) => {
        if (response.ok) {
          setSelectedTags((previousTags) => previousTags.filter((previousTag) => previousTag !== tag))
        }
      })
      .catch((error) => console.error('Error deleting negative keyword:', error));
  })

  const tagMarkup = selectedTags.map((tag) => (<Tag key={tag} onRemove={removeTag(tag)}>{tag}</Tag>))

  // If we get a successful response from the server we will add the keyword to the list
  // of tags. If we don't get a successful response we should inform the user that their
  // keyword can't be confirmed but wasn't necessarily not added and that a refresh should
  // refresh their displayed list of keywords
  const addTag = async (tag) => {
    changeNegativeKeywords("PUT", tag
    // , afetch
    )
      .then((response) => {
        if (response.ok) {
          setSelectedTags((previousTags) => [...previousTags, tag])
          setValue('')
        }
      })
      .catch((error) => console.error('Failed to add negative keyword:', error));
  };

  // We only want to execute a server request if the tag to be added is valid
  const handleSubmit = (event) => {
    event.preventDefault();
    if (value !== "" && !selectedTags.includes(value)) {
      addTag(value);
    }
  };

  return (
    <Box padding={props.padding}>
      <VerticalStack>
        <Form onSubmit={handleSubmit}>
          <FormLayout>
            <TextField
              value={value}
              onChange={handleChange}
              label={props.label}
              connectedRight={<Button submit>{t("Button.submit")}</Button>}
            />
          </FormLayout>
        </Form>
        <br />
        <HorizontalStack gap="1">{tagMarkup}</HorizontalStack>
      </VerticalStack>
    </Box>
  )
}

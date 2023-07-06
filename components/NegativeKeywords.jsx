import { Tag, Form, FormLayout, TextField, Button, VerticalStack, HorizontalStack, Box } from '@shopify/polaris';
import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNegativeKeywordGetter, useNegativeKeywordSetter } from '../hooks';

export const NegativeKeywords = (props) => {
  const { t } = useTranslation()
  const getNegativeKeywords = useNegativeKeywordGetter()
  const addNegativeKeyword = useNegativeKeywordSetter("PUT")
  const remNegativeKeyword = useNegativeKeywordSetter("DELETE")
  const [selectedTags, setSelectedTags] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    getNegativeKeywords()
      .then((response) => setSelectedTags(response))
  }, [])

  const handleChange = (newValue) => {
    setValue(newValue)
  };

  const removeTag = useCallback((tag) => async () => {
    setSelectedTags((previousTags) => previousTags.filter((previousTag) => previousTag !== tag))
    remNegativeKeyword(tag)
  })

  const tagMarkup = selectedTags.map((tag) => (<Tag key={tag} onRemove={removeTag(tag)}>{tag}</Tag>))

  const addTag = async (tag) => {
    setValue('')
    setSelectedTags((previousTags) => [...previousTags, tag])
    addNegativeKeyword(tag)
  };

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

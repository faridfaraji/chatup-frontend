import { Box, Button, Page, useBreakpoints, VerticalStack, Divider, HorizontalStack, HorizontalGrid, AlphaCard, Tag, Form, FormLayout, TextField, Select } from "@shopify/polaris";
import { AccessWrapper, EmbedButton, LoremIpsum, PaddedCell, Setting } from "../components";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useCallback } from "react";
import { useActivePlan, useNegativeKeywordGetter, useNegativeKeywordSetter, useShop, useTemperature } from "../hooks";
import { useContextualSaveBar } from "@shopify/app-bridge-react";
import { tempString } from "../utils/dataUtils";

export default function Settings() {
  const { t } = useTranslation();
  const { smUp } = useBreakpoints();

  // Negative Keys state logic
  // TODO: can this be containerized?

  // Initialize state vars
  const [keysLoading, setKeysLoading] = useState(true);
  const [value, setValue] = useState('');
  const handleValueChange = (newValue) => { setValue(newValue) };
  const getKeys = useNegativeKeywordGetter();
  const putKey = useNegativeKeywordSetter("PUT");
  const delKey = useNegativeKeywordSetter("DELETE");
  const [keys, setKeys] = useState([]);
  const [compKeys, setCompKeys] = useState([]);

  // Initialize with db data
  // We use init logic again later
  const initKeys = () => {
    getKeys().then((data) => {
      setKeys(data)
      setCompKeys(data)
    }).then(() => setKeysLoading(false))
  }
  useEffect(() => initKeys(), [])

  // Define key add/removal in UI
  const remKey = useCallback((remKey) => async () => {
    setKeys((prevKeys) => prevKeys.filter((key) => key !== remKey))
  })
  // keys represented by tags
  const tagMarkup = keys.map((key) => (<Tag key={key} onRemove={remKey(key)}>{key}</Tag>))

  // add a key on form submission
  const addKey = async (key) => {
    setValue('')
    setKeys((prevKeys) => [...prevKeys, key])
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (value !== "" && !keys.includes(value)) addKey(value);
  };

  // Define neg keys component
  const negKeys = (
    <VerticalStack>
      <Form onSubmit={handleSubmit}>
        <FormLayout>
          <TextField
            value={value}
            onChange={handleValueChange}
            label={t("Boundaries.boundariesTitle")}
            connectedRight={<Button submit>{t("Button.submit")}</Button>}
          />
        </FormLayout>
      </Form>
      <br />
      <HorizontalStack gap="1">{tagMarkup}</HorizontalStack>
    </VerticalStack>
    // 
  )

  // Temperature State logic
  // TODO can this be containerized?

  // Initialize state vars
  const putTemp = useTemperature();
  const getShop = useShop();
  const [temp, setTemp] = useState("")
  const [compTemp, setCompTemp] = useState("");
  const handleTempChange = useCallback((value) => setTemp(value), [],);


  // Initialize with db data
  // We use init logic again later
  const initTemp = () => {
    getShop().then((data) => {
      const shopTemp = data ? tempString(data.bot_temperature) : "0.00"
      setTemp(shopTemp)
      setCompTemp(shopTemp)
    })
  }
  useEffect(() => initTemp(), [])

  // Define the temp select component
  const tempDict = {
    "0.00": "professional",
    "0.25": "friendly",
    "0.50": "informal",
    "0.75": "engaging",
    "1.00": "humorous",
  }

  const bot_temp = (
    <Select
      contentEditable={false}
      label={t("Personality.personalityTitle")}
      options={[
        { label: t("Personality.professional"), value: "0.00" },
        { label: t("Personality.friendly"), value: "0.25" },
        { label: t("Personality.informal"), value: "0.50" },
        { label: t("Personality.engaging"), value: "0.75" },
        { label: t("Personality.humorous"), value: "1.00" },
      ]}
      onChange={handleTempChange}
      value={temp}
    />
  )

  // Contextual Save Bar State Logic
  const { show, hide, saveAction, discardAction } = useContextualSaveBar();

  // when keys/temp change we redefine the save action
  useEffect(() => {
    saveAction.setOptions({
      disabled: false,
      loading: false,
      onAction: saveChanges
    });
  }, [keys, temp])

  // when keys/temp change we redefine the discard action
  useEffect(() => {
    discardAction.setOptions({
      disabled: false,
      loading: false,
      discardConfirmationModal: true,
      onAction: discardChanges
    });
  }, [compKeys, compTemp])

  useEffect(() => {

  }, [])

  // Use DB data. put and delete as needed. 
  // Reloading from DB after to ensure correct values
  const saveChanges = () => {
    getKeys().then((data) => {
      const putKeys = keys.filter((key) => !data.includes(key))
      const delKeys = data.filter((key) => !keys.includes(key))
      putKeys.forEach((key) => putKey(key))
      delKeys.forEach((key) => delKey(key))
    }).then(() => putTemp(temp))
      .then(() => {
        initKeys()
        initTemp()

        hide()
      })
  }

  // Just go back to last saved state for discard
  const discardChanges = () => {
    setKeys(compKeys)
    setTemp(compTemp)
    hide()
  }

  // Check whether the save bar is needed every time something changes.
  useEffect(() => checkSave(), [keysLoading, keys, compKeys, temp, compTemp])
  const checkSave = () => {
    if (keysLoading) {
      hide()
    } else if (keys == compKeys && temp == compTemp) {
      hide()
    } else {
      show()
    }
  }

  return (
    <Page
      title={t("NavigationMenu.settings")}
      divider
    >
      <VerticalStack gap={{ xs: "8", sm: "4" }}>
        <Setting
          title={t("Boundaries.boundariesTitle")}
          short={t("Boundaries.boundariesShort")}
          inputs={[{
            component: negKeys,
            copy: t("Boundaries.boundariesCopy"),
          }]}
        />
        {smUp ? <Divider /> : null}
        <Setting
          title={t("Personality.personalityTitle")}
          short={t("Personality.personalityShort")}
          inputs={[{
            component: bot_temp,
            copy: t(`Personality.${tempDict[temp]}Desc`),
          }]}
        />
        {smUp ? <Divider /> : null}
        <Box
          paddingInlineStart={{ xs: 4, sm: 0 }}
          paddingInlineEnd={{ xs: 4, sm: 0 }}
        >
        </Box>
      </VerticalStack>
    </Page>
  )
}
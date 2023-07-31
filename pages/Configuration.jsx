import { Box, Button, Page, useBreakpoints, VerticalStack, Divider, HorizontalStack, HorizontalGrid, AlphaCard, Tag, Form, FormLayout, TextField, Select } from "@shopify/polaris";
import { AccessWrapper, EmbedButton, LoremIpsum, PaddedCell, Setting } from "../components";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useCallback } from "react";
import { useActivePlan, useNegativeKeywordGetter, useNegativeKeywordSetter, useShop, useTemperature } from "../hooks";
import { useContextualSaveBar } from "@shopify/app-bridge-react";
import { tempString } from "../utils/dataUtils";

export default function Configuration() {
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
            label={t("Configuration.negKeysTitle")}
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
  const [tempLoading, setTempLoading] = useState(true);
  const [temp, setTemp] = useState("");
  const handleTempChange = useCallback((value) => setTemp(value), [],);
  const [compTemp, setCompTemp] = useState("");
  const putTemp = useTemperature();
  const getShop = useShop();

  // Initialize with db data
  // We use init logic again later
  const initTemp = () => {
    getShop().then((data) => {
      const shopTemp = data ? tempString(data.bot_temperature) : "0.0"
      setTemp(shopTemp)
      setCompTemp(shopTemp)
    }).then(() => setTempLoading(false))
  }
  useEffect(() => initTemp(), [])



  // Define the temp select component
  const bot_temp = (
    <Select
      label={t("Configuration.tempTitle")}
      options={[
        { label: t("Configuration.professional"), value: "0.00" },
        { label: t("Configuration.friendly"), value: "0.25" },
        { label: t("Configuration.informal"), value: "0.50" },
        { label: t("Configuration.engaging"), value: "0.75" },
        { label: t("Configuration.humorous"), value: "1.00" },
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
  useEffect(() => checkSave(), [keysLoading, tempLoading, keys, compKeys, temp, compTemp])
  const checkSave = () => {
    if (keysLoading || tempLoading) {
      hide()
    } else if (keys == compKeys && temp == compTemp) {
      hide()
    } else {
      show()
    }
  }

  return (
    <Page
      title={t("NavigationMenu.configuration")}
      divider
    >
      <VerticalStack gap={{ xs: "8", sm: "4" }}>
        <Setting
          title={t("Configuration.negKeysTitle")}
          short={t("Configuration.negKeysShort")}
          inputs={[{
            copy: t("Configuration.negKeysCopy"),
            component: negKeys
          }]}
        />
        {smUp ? <Divider /> : null}
        <AccessWrapper minimum={2}>
          <Setting
            title={t("Configuration.tempTitle")}
            short={t("Configuration.tempShort")}
            inputs={[{
              copy: t("Configuration.tempCopy"),
              component: bot_temp
            }]}
          />
        </AccessWrapper>
        {smUp ? <Divider /> : null}
        <Box
          paddingInlineStart={{ xs: 4, sm: 0 }}
          paddingInlineEnd={{ xs: 4, sm: 0 }}
        >
          <PaddedCell padding={["0", "0", "4", "0"]}>
            <AlphaCard bg="--p-color-bg-inverse-active">
              <HorizontalGrid columns={{ xs: "1fr", md: "5fr 2fr" }} gap="4" alignItems="center">
                <LoremIpsum content={t("Configuration.bottomCopy")} />
                <EmbedButton />
              </HorizontalGrid>
            </AlphaCard>
          </PaddedCell>
        </Box>
      </VerticalStack>
    </Page>
  )
}
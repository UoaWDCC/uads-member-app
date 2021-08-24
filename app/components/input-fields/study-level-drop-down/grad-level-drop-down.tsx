import React from "react"
import {
  Select,
  VStack,
  CheckIcon,
  Center,
  Text,
  NativeBaseProvider,
} from "native-base"
export const GradLevel = () => {
  let [language, setLanguage] = React.useState("")
  return (
    <VStack alignItems="center" space={4}>
      <Select
        defaultValue={"Undergraduate"}
        selectedValue={language}
        minWidth={200}
        accessibilityLabel="Select your favorite programming language"
        // placeholder="Select your favorite programming language"
        onValueChange={(itemValue) => setLanguage(itemValue)}
        _selectedItem={{
          bg: "cyan.600",
          endIcon: <CheckIcon size={4} />,
        }}
      >
        <Select.Item label="Undergraduate" value="Undergraduate"/>
        <Select.Item label="Postgraduate" value="Postgraduate"/>
      </Select>
    </VStack>
  )
}

// eslint-disable-next-line react/display-name
export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <GradLevel />
      </Center>
    </NativeBaseProvider>
  )
}

import React from "react"
import { Input, Center, NativeBaseProvider } from "native-base"
import { color } from "../../../theme"

export const InputField = () => {
  return (
    <Input
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ width: 208, height: 38}}
      borderRadius="20"
      placeholder="Enter UPI"
      _light={{
        placeholderTextColor: color.text,
        backgroundColor: color.palette.goldenGlow,
        borderColor: color.text
      }}
      _dark={{
        placeholderTextColor: color.text,
      }}
    />
  )
}

// eslint-disable-next-line react/display-name
export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <InputField />
      </Center>
    </NativeBaseProvider>
  )
}

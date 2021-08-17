import React from "react"
import { Input, Center, NativeBaseProvider } from "native-base"
import { color } from "../../theme"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { borderColor } from "styled-system"
export function InputField(InputFieldProps: props) {
  return (
    <Input
      w="80%"
      borderRadius="40"
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

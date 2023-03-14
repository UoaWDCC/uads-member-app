import React from "react"
import { Input, Center, NativeBaseProvider } from "native-base"
import { color } from "../../../theme"

export const EmailInputField = () => {

  return (
    <Input
     // getRef={input => {
      //  upi = input
      //  console.log(upi)
     // }}
      // eslint-disable-next-line react-native/no-inline-styles
      ref={emailRef}
      style={{ width: 208, height: 38}}
      borderRadius="40px"
      placeholder="Email..."
      _light={{
        placeholderTextColor: color.text,
        backgroundColor: color.palette.goldenGlow,
        borderColor: color.palette.goldenGlow
      }}
      _dark={{
        placeholderTextColor: color.text,
      }}
      // onChangeText={(text) => this.setState({text})}
    />
  )
}

// eslint-disable-next-line react/display-name
export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <EmailInputField />
      </Center>
    </NativeBaseProvider>
  )
}

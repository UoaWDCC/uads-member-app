import React from "react"
import { Input, Center, NativeBaseProvider } from "native-base"
import { color } from "../../theme"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { borderColor } from "styled-system"

export const UpiInputField = () => {

  return (
    <Input
     // getRef={input => {
      //  upi = input
      //  console.log(upi)
     // }}
      style={{ width: 208, height: 38, position: 'absolute', top: '32%'}}
      borderRadius="40px"
      placeholder="UPI..."
      _light={{
        placeholderTextColor: color.text,
        backgroundColor: color.palette.goldenGlow,
        borderColor: color.text
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
        <UpiInputField />
      </Center>
    </NativeBaseProvider>
  )
}

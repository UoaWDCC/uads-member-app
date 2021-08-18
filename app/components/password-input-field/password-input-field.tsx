import React from "react"
import { Input, Center, NativeBaseProvider, Button } from "native-base"
import { color } from "../../theme"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { borderColor } from "styled-system"

export const PasswordInputField = () => {
  const [show, setShow] = React.useState(false)

  const handleClick = () => setShow(!show)

  return (
    <Input
      style={{ width: 208, height: 38, position: 'absolute', top: '40%'}}
      borderRadius="40px"
      type={show ? "text" : "password"}
      placeholder="Password..."

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
        <PasswordInputField />
      </Center>
    </NativeBaseProvider>
  )
}

import React from "react"
import { Input, Center, NativeBaseProvider } from "native-base"
import { color } from "../../../theme"

export const PasswordInputField = () => {
  const [show] = React.useState(false)

  // const handleClick = () => setShow(!show)

  return (
    <Input
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ 
        width: 208, 
        height: 38,
        top: '40%'
        }}
      borderRadius="40px"
      type={show ? "text" : "password"}
      placeholder="Password..."

      _light={{
        placeholderTextColor: color.text,
        backgroundColor: color.palette.goldenGlow,
        borderColor: color.palette.goldenGlow
      }}
      _dark={{
        placeholderTextColor: color.palette.goldenGlow,
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

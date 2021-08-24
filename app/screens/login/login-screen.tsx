import React from "react"
import { observer } from "mobx-react-lite"
import { Linking, View, ViewStyle, StyleSheet } from "react-native"
import { Screen, Text, TextField, SignInButton, Logo, Icon } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { UpiInputField } from "../../components/input-fields/upi-input-field/upi-input-field"
import { Box, NativeBaseProvider, Stack } from "native-base"
import { PasswordInputField } from "../../components/input-fields/password-input-field/password-input-field"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center"
}

const styles = StyleSheet.create({
    textStyle: {
      flex: 1,
      position: 'absolute',
      top: '60%',

    },
    
})

export const LoginScreen = observer(function LoginScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      { /* <Image source={require("../../../assets/images/logo.png")} /> */ }
      <Text preset="header" text="LOGIN HERE"/>
      <NativeBaseProvider>
        <Box flex={1} alignItems="center" justifyContent="center">
        <Stack space={4}>
          <UpiInputField/>
          <PasswordInputField/>
          </Stack>
        </Box>
      </NativeBaseProvider>
      <Text text="Don't have an account? Sign up!" style={styles.textStyle} onPress={() => Linking.openURL('http://google.com')}></Text>
      <SignInButton text='SIGN IN' />
    </Screen>
  )
})
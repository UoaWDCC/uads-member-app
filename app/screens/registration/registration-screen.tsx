/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useRef } from "react";
import { observer } from "mobx-react-lite"
import { Button, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { FormControl, Input, NativeBaseProvider, Stack } from "native-base"
import { GradLevel } from "../../components/input-fields/study-level-drop-down/grad-level-drop-down"
import { useNavigation } from "@react-navigation/native"
import { FirstNameInput } from "../../components/input-fields/first-name-input/first-name-input"
import firebase from '@react-native-firebase/app';
import { LastNameInput } from "../../components/input-fields/last-name-input/last-name-input"
import { AuthContext } from "./context/AuthContext";
import { auth } from "./firebaseSetup";
import { UpiInputField } from "../../components/input-fields/upi-input-field/upi-input-field";
import { PasswordInputField } from "../../components/input-fields/password-input-field/password-input-field";
import { EmailInputField } from "../../components/input-fields/email-input-field/email-input-field";

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center"
}

export const RegistrationScreen = observer(function RegistrationScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  

  // Pull in navigation via hook
  const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text="Registration" />
      <NativeBaseProvider>
        <Stack space={4}>
        <FormControl>
          <EmailInputField ref={emailRef}></EmailInputField>
        </FormControl>
        
            <FirstNameInput></FirstNameInput>
            <LastNameInput></LastNameInput>
            <UpiInputField></UpiInputField>
            <FormControl>
            <PasswordInputField></PasswordInputField>
            </FormControl>
            
            { /* <Input style={{ width: 208, height: 38, placeholderTextColor: color.text, backgroundColor: color.palette.goldenGlow,
              borderColor: color.palette.goldenGlow}} borderRadius="40px" placeholder="First Name..."/>
              value={this.state.username} />
            <Input style={{ width: 208, height: 38, placeholderTextColor: color.text, backgroundColor: color.palette.goldenGlow,
              borderColor: color.palette.goldenGlow}} borderRadius="40px" placeholder="Last Name..." /> */}
            { /* <Input style={{ width: 208, height: 38, placeholderTextColor: color.text, backgroundColor: color.palette.goldenGlow,
              borderColor: color.palette.goldenGlow}} borderRadius="40px" placeholder="University..." />  */}
            { /* <GradLevel></GradLevel> */}
            <Button
              title="Sign Up"
              onPress={() =>
                signUpPressed()
              }/>
            <Button
              title="Back to login"
              onPress={() =>
                navigation.navigate('login')
              }/>
              
        </Stack>
      </NativeBaseProvider>
    </Screen>
  )
})
